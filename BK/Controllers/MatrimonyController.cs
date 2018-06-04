using BK.Context;
using BK.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BK.Controllers
{
    [Authorize]
    public class MatrimonyController : BaseController
    {
        [Route("api/matrimony")]
        [HttpGet]
        public IHttpActionResult Get(int memberId)
        {

            using (bkContext context = new bkContext())
            {
                Matrimonial mat = context.Matrimonials.FirstOrDefault(x => x.MemberID == memberId);
                if (mat == null)
                    return BadRequest("Matrimony profile cannot be loaded");

                MatrimonyViewModel model = new MatrimonyViewModel();

                model.Alcohol = mat.Alcohol;
                model.BirthTime = mat.BirthTime;
                model.BodyTypeId = mat.BodyTypeID;
                model.ComplexionTypeId = mat.ComplexionTypeID;
                model.Disability = mat.Disability;
                model.Height = mat.Height;
                model.Language = mat.Language;
                model.Mangal = mat.Mangal;
                model.MaritalStatusId = mat.MaritalStatusID;
                model.MaternalNukhId = mat.MaternalNukhID;                
                model.MemberId = mat.MemberID;
                model.MonthlyIncome = mat.MonthlyIncome;
                model.OwnHome = mat.OwnHome;
                model.ProfileText = mat.ProfileText;
                model.Smoke = mat.Smoke;
                model.Tobacco = mat.Tobacco;
                model.Vegetarian = mat.Vegetarian;
                model.Weight = mat.Weight;

                return Ok(model);
            }
        }

        [Route("api/matrimony-view")]
        [HttpGet]
        public IHttpActionResult GetMatrimony(int memberId)
        {
            using (bkContext context = new bkContext())
            {
                Matrimonial mat = context.Matrimonials.FirstOrDefault(x => x.MemberID == memberId);
                if (mat == null)
                    return BadRequest("Matrimony profile cannot be loaded");

                Member member = context.Members.FirstOrDefault(x => x.MemberID == memberId);
                if (member == null)
                    return BadRequest("Matrimony profile cannot be loaded");

                MatrimonyViewOnlyModel model = new MatrimonyViewOnlyModel();

                model.MatrimonyModel.Alcohol = mat.Alcohol;
                model.MatrimonyModel.BirthTime = mat.BirthTime;
                model.MatrimonyModel.BodyTypeId = mat.BodyTypeID;
                model.MatrimonyModel.ComplexionTypeId = mat.ComplexionTypeID;
                model.MatrimonyModel.Disability = mat.Disability;
                model.MatrimonyModel.Height = mat.Height;
                model.MatrimonyModel.Language = mat.Language;
                model.MatrimonyModel.Mangal = mat.Mangal;
                model.MatrimonyModel.MaritalStatusId = mat.MaritalStatusID;
                model.MatrimonyModel.MaternalNukhId = mat.MaternalNukhID;
                model.MatrimonyModel.MemberId = mat.MemberID;
                model.MatrimonyModel.MonthlyIncome = mat.MonthlyIncome;
                model.MatrimonyModel.OwnHome = mat.OwnHome;
                model.MatrimonyModel.ProfileText = mat.ProfileText;
                model.MatrimonyModel.Smoke = mat.Smoke;
                model.MatrimonyModel.Tobacco = mat.Tobacco;
                model.MatrimonyModel.Vegetarian = mat.Vegetarian;
                model.MatrimonyModel.Weight = mat.Weight;
                
                model.MemberModel.MemberID = member.MemberID;
                model.MemberModel.FirstName = member.FirstName;
                model.MemberModel.LastName = member.LastName;
                model.MemberModel.NickName = member.NickName;
                model.MemberModel.Email = member.EmailAddress;
                model.MemberModel.PhoneNumber = member.Phone;
                model.MemberModel.AadhaarNumber = member.AadhaarNumber;
                model.MemberModel.Gender = member.Gender;
                model.MemberModel.DOB = member.DOB;
                model.MemberModel.BirthPlace = member.BirthPlace;
                model.MemberModel.Alive = member.Alive;
                model.MemberModel.DOD = member.DOD;
                model.MemberModel.DeathPlace = member.DeathPlace;
                model.MemberModel.EducationLevel = member.EducationLevel;
                model.MemberModel.EducationField = member.EducationField;
                model.MemberModel.OccupationId = member.OccupationID;
                model.MemberModel.CompanyName = member.CompanyName;
                model.MemberModel.JobTitle = member.JobTitle;
                model.MemberModel.InstagramHandle = member.InstagramHandle;
                model.MemberModel.FacebookHandle = member.FacebookHandle;
                model.MemberModel.TwitterHandle = member.TwitterHandle;
                model.MemberModel.Married = member.Married;       

                return Ok(model);
            }
        }

        [Route("api/matrimony/delete")]
        [HttpGet]
        public IHttpActionResult Delete(int memberId)
        {
            using (bkContext context = new bkContext())
            {                
                if (!CanEditMember(memberId))
                    return BadRequest("You do not have permission to delete this record");

                Matrimonial mat = context.Matrimonials.FirstOrDefault(x => x.MemberID == memberId);
                if (mat == null)
                    return BadRequest("Matrimony profile cannot be loaded");

                context.Matrimonials.Remove(mat);
                context.SaveChanges();
            }

            return Ok();
        }

        [Route("api/matrimony/save")]
        [HttpPost]
        public IHttpActionResult Save(MatrimonyViewModel model)
        {
            using (bkContext context = new bkContext())
            {
                if (!CanEditMember(model.MemberId))
                    return BadRequest("You do not have permission to udpate this record");

                Matrimonial mat = context.Matrimonials.FirstOrDefault(x => x.MemberID == model.MemberId); ;

                if (mat != null)
                {                                        
                    mat.ModifiedBy = LoggedInMemberId;
                    mat.ModifiedOn = DateTime.Now;                    
                }
                else
                {
                    mat = new Matrimonial();
                    mat.CreatedBy = LoggedInMemberId;
                    mat.CreatedOn = DateTime.Now;
                    mat.MemberID = model.MemberId;
                    context.Matrimonials.Add(mat);
                }

                mat.Alcohol = model.Alcohol;
                mat.BirthTime = model.BirthTime;
                mat.BodyTypeID = model.BodyTypeId;
                mat.ComplexionTypeID = model.ComplexionTypeId;
                mat.Disability = model.Disability;
                mat.Height = model.Height;
                mat.Language = model.Language;
                mat.Mangal = model.Mangal;
                mat.MaritalStatusID = model.MaritalStatusId;
                mat.MaternalNukhID = model.MaternalNukhId;                
                mat.MonthlyIncome = model.MonthlyIncome;
                mat.OwnHome = model.OwnHome;
                mat.ProfileText = model.ProfileText;
                mat.Smoke = model.Smoke;
                mat.Tobacco = model.Tobacco;
                mat.Vegetarian = model.Vegetarian;
                mat.Weight = model.Weight;

                context.SaveChanges();
            }

            return Ok();
        }
    }
}

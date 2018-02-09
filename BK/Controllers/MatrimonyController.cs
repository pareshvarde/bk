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

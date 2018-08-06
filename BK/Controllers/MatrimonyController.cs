using BK.Context;
using BK.ViewModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Drawing;
using System.Dynamic;
using System.IO;
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
                Member member = context.Members.FirstOrDefault(x => x.MemberID == memberId);
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
                model.Photo1Url = MemberWrapper.MatrimonyPhoto(mat.MemberID, mat.Member.Gender, 1, mat.ModifiedOn);
                model.Photo2Url = MemberWrapper.MatrimonyPhoto(mat.MemberID, mat.Member.Gender, 2, mat.ModifiedOn);
                model.Photo3Url = MemberWrapper.MatrimonyPhoto(mat.MemberID, mat.Member.Gender, 3, mat.ModifiedOn);

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
                model.MatrimonyModel.Photo1Url = MemberWrapper.MatrimonyPhoto(mat.MemberID, mat.Member.Gender, 1, mat.ModifiedOn);
                model.MatrimonyModel.Photo2Url = MemberWrapper.MatrimonyPhoto(mat.MemberID, mat.Member.Gender, 2, mat.ModifiedOn);
                model.MatrimonyModel.Photo3Url = MemberWrapper.MatrimonyPhoto(mat.MemberID, mat.Member.Gender, 3, mat.ModifiedOn);

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
                model.MemberModel.MaritalStatusId = member.MaritalStatusID;                
                model.MemberModel.PhotoUrl = MemberWrapper.ProfilePhoto(member.MemberID, member.Gender, member.ModifiedOn);
                model.MemberModel.FamilyId = member.FamilyMemberAssociations.Where(x => x.DefaultFamily).Select(x => x.FamilyId).FirstOrDefault();

                model.MemberModel.ModifiedOn = mat.ModifiedOn.HasValue ? mat.ModifiedOn : mat.CreatedOn;                
                if (member.ModifiedOn > model.MemberModel.ModifiedOn)
                    model.MemberModel.ModifiedOn = member.ModifiedOn;

                GetMaternalFamily_Result mResult = context.GetMaternalFamily(member.MemberID).FirstOrDefault();
                if (mResult != null)
                {
                    model.MemberModel.MaternalFamilyId = mResult.MaternalFamilyID;
                    model.MemberModel.MaternalFamilyName = string.Format("{0}, {1}", mResult.MaternalFamilyName, mResult.MaternalFamilyAddress);
                }               

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
                    return BadRequest("You do not have permission to update this record");

                Matrimonial mat = context.Matrimonials.FirstOrDefault(x => x.MemberID == model.MemberId);
                Member member = mat.Member;

                if (!member.Alive)
                    return BadRequest("You cannot create a matrimony profile unless a member is alive");

                if (member.MaritalStatusID == 2)
                    return BadRequest("You cannot create a matrimony profile because person's marital status is set to Married");

                if (!member.DOB.HasValue)
                    return BadRequest("You cannot create a matrimony profile because person's Date Of Birth is missing");

                if (member.Gender && MemberWrapper.Age(member.DOB.Value) < 21)
                    return BadRequest("You cannot create a matrimony profile because person's age is less than 21");

                if (!member.Gender && MemberWrapper.Age(member.DOB.Value) < 18)
                    return BadRequest("You cannot create a matrimony profile because person's age is less than 18");

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

        [Route("api/matrimony/search")]
        [HttpPost]
        public IHttpActionResult Search(MatrimonySearchModel model)
        {            
            int? categoryId = model.CategoryID.HasValue && model.CategoryID.Value > 0 ? model.CategoryID : null;
            int? nukhId = model.NukhID.HasValue && model.NukhID.Value > 0 ? model.NukhID : null;
            string city = string.IsNullOrWhiteSpace(model.City) ? null : model.City.Trim();
            string district = string.IsNullOrWhiteSpace(model.District) ? null : model.District.Trim();
            string state = string.IsNullOrWhiteSpace(model.State) ? null : model.State.Trim();
            string country = string.IsNullOrWhiteSpace(model.Country) ? null : model.Country.Trim();
            bool? gender = model.Gender;
            int? occupationId = model.OccupationId.HasValue && model.OccupationId.Value > 0 ? model.OccupationId : null;
            int? maritalStatusId = model.MaritalStatusId.HasValue && model.MaritalStatusId.Value > 0 ? model.MaritalStatusId : null;
            int? minAge = model.MinimumAge.HasValue && model.MinimumAge.Value > 0 ? model.MinimumAge : null;
            int? maxAge = model.MaximumAge.HasValue && model.MaximumAge.Value > 0 ? model.MaximumAge : null;
            int? currentPage = model.CurrentPage.HasValue && model.CurrentPage.Value > 0 ? model.CurrentPage : null;
            int? pageSize = model.PageSize.HasValue && model.PageSize.Value > 0 ? model.PageSize : null;
            string sortOrder = string.IsNullOrWhiteSpace(model.SortOrder) ? null : model.SortOrder.Trim();
            DateTime? minDOB = null;
            DateTime? maxDOB = null;

            if (minAge.HasValue)
                maxDOB = DateTime.Today.AddYears(minAge.Value * -1);

            if (maxAge.HasValue)
                minDOB = DateTime.Today.AddYears(maxAge.Value * -1);

            MemberSearchResultModel mvm = new MemberSearchResultModel();

            using (bkContext context = new bkContext())
            {
                ObjectParameter oParameter = new ObjectParameter("TotalRecords", typeof(int));

                List<bk_MatrimonySearch_Result> results = context.bk_MatrimonySearch(categoryId, nukhId, city, district, state, country, gender, occupationId, maritalStatusId, minDOB, maxDOB, pageSize, currentPage, sortOrder, oParameter).ToList();
                
                mvm.TotalRecords = (int)oParameter.Value;

                foreach (var result in results)
                {
                    var item = new MemberSearchResultItemModel();

                    item.Name = $"{result.FirstName} {result.LastName}";
                    item.Address1 = $"{result.Address1}, {result.Address2}".TrimEnd(' ').TrimEnd(',').TrimStart(',');
                    item.Address2 = $"{result.City}, {result.District}, {result.State}, {result.Country}".TrimEnd(' ').TrimEnd(',').TrimStart(',').Replace(", , ", ", ");
                    item.MemberId = result.MemberID;
                    item.FamilyId = result.FamilyID;
                    item.Gender = result.Gender;
                    item.DOB = result.DOB;
                    item.OccupationId = result.OccupationID > 0 ? result.OccupationID : (int?) null;
                    item.MonthlyIncome = result.MonthlyIncome > 0 ? result.MonthlyIncome : (int?)null;

                    if (!string.IsNullOrWhiteSpace(result.EducationField) && !string.IsNullOrWhiteSpace(result.EducationLevel))
                        item.Education = $"{result.EducationLevel} - {result.EducationField}";
                    else if (!string.IsNullOrWhiteSpace(result.EducationLevel))
                        item.Education = $"{result.EducationLevel}";
                    else if (!string.IsNullOrWhiteSpace(result.EducationField))
                        item.Education = $"{result.EducationField}";

                    item.PhotoUrl = MemberWrapper.ProfilePhoto(result.MemberID, result.Gender, result.ModifiedOn);
                    item.Photo1Url = MemberWrapper.MatrimonyPhoto(result.MemberID, result.Gender, 1, result.ModifiedOn);
                    item.Photo2Url = MemberWrapper.MatrimonyPhoto(result.MemberID, result.Gender, 2, result.ModifiedOn);
                    item.Photo3Url = MemberWrapper.MatrimonyPhoto(result.MemberID, result.Gender, 3, result.ModifiedOn);

                    mvm.Results.Add(item);
                }
            }

            return Ok(mvm);
        }

        [Route("api/matrimony/uploadPhoto")]
        [HttpPost]
        public IHttpActionResult UploadPhoto(dynamic json)
        {
            dynamic model = JsonConvert.DeserializeObject<ExpandoObject>(json.ToString());
            int memberId = Convert.ToInt32(model.memberId);
            int photoNumber = Convert.ToInt32(model.photoNumber);

            if (!CanEditMember(memberId))
                return BadRequest("You do not have permission to edit this member");

            if (string.IsNullOrWhiteSpace(model.image))
                return BadRequest("No image content provided");

            if (photoNumber < 1 || photoNumber > 3)
                return BadRequest("Invalid photo number");

            byte[] imageBytes = Convert.FromBase64String(model.image.Replace("data:image/jpeg;base64,", ""));

            using (MemoryStream stream = new MemoryStream(imageBytes))
            {
                Image img = Image.FromStream(stream);
                string filePath = System.Web.Hosting.HostingEnvironment.MapPath(string.Format(@"~/Images/Matrimonials/{0}_{1}.jpg", memberId, photoNumber));
                img.Save(filePath);
            }

            using (bkContext context = new bkContext())
            {
                Matrimonial mat = context.Matrimonials.FirstOrDefault(x => x.MemberID == memberId);
                if (mat != null)
                {
                    mat.ModifiedBy = LoggedInMemberId;
                    mat.ModifiedOn = DateTime.Now;

                    context.SaveChanges();
                }
            }

            return Ok();
        }

    }
}


using BK.Context;
using BK.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Mail;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Drawing;
using Newtonsoft.Json;
using System.Dynamic;
using System.Text.RegularExpressions;

namespace BK.Controllers
{
    [Authorize]
    public class MemberController : BaseController
    {
        [Route("api/member/changePassword")]
        [HttpPost]
        public IHttpActionResult ChangePassword(ChangePasswordViewModel model)
        {
            using (bkContext context = new bkContext())
            {
                Member member = context.Members.Where(x => x.MemberID == LoggedInMemberId).FirstOrDefault();
                if (member == null)
                    return BadRequest("Your record cannot be loaded. Please try again or contact Administrator for help");

                if (member.Password != model.CurrentPassword)
                    return BadRequest("Your current password is invalid. Please try again");

                member.Password = model.NewPassword;
                member.ModifiedBy = member.MemberID;
                member.ModifiedOn = DateTime.Now;

                context.SaveChanges();
            }

            return Ok(true);
        }

        [Route("api/member")]
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult Get(int memberId, int familyId)
        {
            using (bkContext context = new bkContext())
            {
                Member member = context.Members.Where(x => x.MemberID == memberId).FirstOrDefault();
                if (member == null)
                    return BadRequest("Your record cannot be loaded. Please try again or contact Administrator for help");

                List<FamilyMemberAssociation> fmAssociation = context.FamilyMemberAssociations.Where(x => x.FamilyId == familyId).ToList();

                MemberViewModel vm = new MemberViewModel();

                vm.MemberID = member.MemberID;
                vm.FirstName = member.FirstName;
                vm.LastName = member.LastName;
                vm.NickName = member.NickName;
                vm.Email = member.EmailAddress;
                vm.PhoneNumber = member.Phone;
                vm.AadhaarNumber = member.AadhaarNumber;
                vm.Gender = member.Gender;
                vm.DOB = member.DOB;
                vm.BirthPlace = member.BirthPlace;
                vm.Alive = member.Alive;
                vm.DOD = member.DOD;
                vm.DeathPlace = member.DeathPlace;
                vm.EducationLevel = member.EducationLevel;
                vm.EducationField = member.EducationField;
                vm.OccupationId = member.OccupationID;
                vm.CompanyName = member.CompanyName;
                vm.JobTitle = member.JobTitle;
                vm.InstagramHandle = member.InstagramHandle;
                vm.FacebookHandle = member.FacebookHandle;
                vm.TwitterHandle = member.TwitterHandle;
                vm.MaritalStatusId = member.MaritalStatusID;
                vm.Anniversary = member.Anniversary;
                vm.PhotoUrl = MemberWrapper.ProfilePhoto(member.MemberID, member.Gender, member.ModifiedOn);
                vm.ModifiedOn = member.ModifiedOn.HasValue ? member.ModifiedOn : member.CreatedOn;
                vm.ProfileText = member.ProfileText;

                GetMaternalFamily_Result mResult = context.GetMaternalFamily(member.MemberID).FirstOrDefault();
                if (mResult != null)
                {
                    vm.MaternalFamilyId = mResult.MaternalFamilyID;
                    vm.MaternalFamilyName = string.Format("{0}, {1}", mResult.MaternalFamilyName, mResult.MaternalFamilyAddress);
                }

                GetPaternalFamily_Result pResult = context.GetPaternalFamily(member.MemberID, member.Gender, member.MaritalStatusID).FirstOrDefault();
                if (pResult != null)
                {
                    vm.PaternalFamilyId = pResult.PaternalFamilyID;
                    vm.PaternalFamilyName = string.Format("{0}, {1}", pResult.PaternalFamilyName, pResult.PaternalFamilyAddress);
                }

                FamilyMemberAssociation fma = fmAssociation.FirstOrDefault(x => x.MemberId == memberId);
                if (fma != null)
                {
                    vm.RelatedMemberId = fma.RelatedId;
                    vm.RelationTypeId = fma.RelationTypeId;
                    vm.DefaultFamily = fma.DefaultFamily;
                }

                vm.canEdit = CanEditMember(fmAssociation, memberId);

                return Ok(vm);
            }
        }

        [Route("api/member/lookup")]
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult Lookup(int memberId)
        {
            using (bkContext context = new bkContext())
            {
                Member member = context.Members.Where(x => x.MemberID == memberId).FirstOrDefault();
                if (member == null)
                    return BadRequest("Your record cannot be loaded. Please try again or contact Administrator for help");

                MemberViewModel vm = new MemberViewModel();

                vm.FirstName = member.FirstName;
                vm.LastName = member.LastName;
                vm.Gender = member.Gender;

                return Ok(vm);
            }
        }

        [Route("api/member/save")]
        [HttpPost]
        public IHttpActionResult Save(MemberViewModel model)
        {
            if (!model.MemberID.HasValue)
                if (!CanEditFamily(model.FamilyId.Value))
                    return BadRequest("You do not have permission to edit this family");

            if (model.MemberID.HasValue)
                if (!CanEditMember(model.FamilyId.Value, model.MemberID.Value))
                    return BadRequest("You do not have permission to edit this member");

            bool sendWelcomeLetter = false;

            using (bkContext context = new bkContext())
            {
                Member member = null;

                if (model.MemberID.HasValue)
                {
                    member = context.Members.Where(x => x.MemberID == model.MemberID).FirstOrDefault();
                    if (member == null)
                        return BadRequest("Member record cannot be loaded. Please try again or contact Administrator for help");

                    //if member record has email address and login was done no change in email address allowed
                    if (!string.IsNullOrWhiteSpace(member.EmailAddress) && member.EmailAddress != model.Email && member.LastLoginOn.HasValue)
                        return BadRequest("You cannot change email address. Please contact Administrator for help");

                    member.ModifiedBy = LoggedInMemberId;
                    member.ModifiedOn = DateTime.Now;

                    //if email was not available and later on provided
                    sendWelcomeLetter = string.IsNullOrWhiteSpace(member.EmailAddress) && !string.IsNullOrWhiteSpace(model.Email);

                    if (!sendWelcomeLetter) //email changed and no earlier sign in attempt was made
                        sendWelcomeLetter = !string.IsNullOrWhiteSpace(model.Email) && member.EmailAddress != model.Email && !member.LastLoginOn.HasValue;
                }
                else
                {
                    member = new Member();

                    string tPassword = System.Web.Security.Membership.GeneratePassword(8, 0);
                    tPassword = Regex.Replace(tPassword, @"[^a-zA-Z0-9]", m => "9");
                    member.Password = tPassword;

                    member.CreatedOn = DateTime.Now;
                    member.CreatedBy = LoggedInMemberId;
                    context.Members.Add(member);

                    sendWelcomeLetter = !string.IsNullOrWhiteSpace(model.Email);
                }

                member.AadhaarNumber = model.AadhaarNumber;
                member.Alive = model.Alive;
                member.BirthPlace = model.BirthPlace;
                member.CompanyName = model.CompanyName;
                member.DeathPlace = model.DeathPlace;
                member.DOB = model.DOB;
                member.DOD = model.DOD;
                member.EducationField = model.EducationField;
                member.EducationLevel = model.EducationLevel;
                member.EmailAddress = string.IsNullOrWhiteSpace(model.Email) ? null : model.Email.Trim();
                member.FacebookHandle = model.FacebookHandle;
                member.FirstName = model.FirstName;
                member.Gender = model.Gender;
                member.InstagramHandle = model.InstagramHandle;
                member.OccupationID = model.OccupationId;
                member.JobTitle = model.JobTitle;
                member.LastName = model.LastName;
                member.NickName = model.NickName;
                member.Phone = model.PhoneNumber;
                member.TwitterHandle = model.TwitterHandle;
                member.MaritalStatusID = model.MaritalStatusId;
                member.Anniversary = model.Anniversary;
                member.Active = !string.IsNullOrWhiteSpace(member.EmailAddress);
                member.ProfileText = model.ProfileText;

                //TODO: check only if the email address has changed.
                if (!string.IsNullOrWhiteSpace(member.EmailAddress))
                    if (context.Members.Any(x => x.EmailAddress == member.EmailAddress && x.MemberID != member.MemberID))
                        return BadRequest("Email address is already registered with other member");

                FamilyMemberAssociation mAssociation = member.FamilyMemberAssociations.Where(f => f.FamilyId == model.FamilyId.Value).FirstOrDefault();
                if (mAssociation == null)
                {
                    mAssociation = new FamilyMemberAssociation();
                    mAssociation.CreatedOn = DateTime.Now;
                    mAssociation.CreatedBy = LoggedInMemberId;
                    mAssociation.DefaultFamily = true;
                    mAssociation.Approved = true;
                    mAssociation.FamilyId = model.FamilyId.Value;
                    member.FamilyMemberAssociations.Add(mAssociation);
                }

                mAssociation.RelatedId = model.RelatedMemberId;
                mAssociation.RelationTypeId = model.RelationTypeId;

                context.SaveChanges();

                if (sendWelcomeLetter)
                {
                    string templatePath = System.Web.Hosting.HostingEnvironment.MapPath("~/HtmlTemplates/welcome_to_family.html");
                    string html = File.ReadAllText(templatePath);

                    html = html.Replace("{{name}}", $"{member.FirstName} {member.LastName}");
                    html = html.Replace("{{addedby}}", LoggedInMemberFullName);
                    html = html.Replace("{{action_url}}", $"{BaseUrl}/login/ ");
                    html = html.Replace("{{username}}", member.EmailAddress);
                    html = html.Replace("{{password}}", member.Password);

                    System.Threading.Tasks.Task.Factory.StartNew(() =>
                    {
                        using (SmtpClient sClient = new SmtpClient())
                        {
                            using (MailMessage mailMessage = new MailMessage("brahmkshatriyaportal@gmail.com", member.EmailAddress))
                            {
                                mailMessage.Body = html;
                                mailMessage.IsBodyHtml = true;
                                mailMessage.Subject = "Brahmkshatriya Online Portal - Welcome Letter";

                                sClient.Send(mailMessage);
                            }
                        }
                    });
                }
            }

            return Ok();
        }

        [Route("api/member/addtofamily")]
        [HttpPost]
        public IHttpActionResult AddToFamily(dynamic json)
        {        
            dynamic model = JsonConvert.DeserializeObject<ExpandoObject>(json.ToString());

            int familyId = Convert.ToInt32(model.familyId);
            int memberId = Convert.ToInt32(model.memberId);
            string relationType = (string)model.relationType;
            int? relatedId = (int?)model.relatedId;
            int? relationTypeId = (int?)model.relationTypeId;
                

            if (!CanEditFamily(familyId))
                return BadRequest("You do not have permission to edit this family");

            using (bkContext context = new bkContext())
            {
                Member member = context.Members.Include(x => x.FamilyMemberAssociations).FirstOrDefault(x => x.MemberID == memberId);
                if (member == null)
                    return BadRequest("Member cannot be located. Please try again later");

                Member relatedMember = null;
                if (relatedId.HasValue)
                {
                    relatedMember = context.Members.Include(x => x.FamilyMemberAssociations).FirstOrDefault(x => x.MemberID == relatedId.Value);
                    if (relatedMember == null)
                        return BadRequest("Related member cannot be located. Please try again later");

                    if (!relatedMember.FamilyMemberAssociations.Any(x => x.FamilyId == familyId))
                        return BadRequest("Related member is not part of the family");
                }

                if (member.FamilyMemberAssociations.Any(x => x.FamilyId == familyId))
                    return BadRequest("Member is already a part of selected family");                               
                
                bool autoApproval = CanEditMember(memberId);

                FamilyMemberAssociation fmAssociation = new FamilyMemberAssociation();
                fmAssociation.Approved = autoApproval;
                fmAssociation.CreatedBy = LoggedInMemberId;
                fmAssociation.CreatedOn = DateTime.Now;
                fmAssociation.FamilyId = familyId;
                fmAssociation.MemberId = memberId;
                fmAssociation.RelatedId = relatedId;
                fmAssociation.RelationTypeId = relationTypeId;

                context.FamilyMemberAssociations.Add(fmAssociation);
                context.SaveChanges();

                if (!string.IsNullOrWhiteSpace(member.EmailAddress) && !autoApproval)
                {
                    string templatePath = System.Web.Hosting.HostingEnvironment.MapPath("~/HtmlTemplates/familyAddition.html");
                    string html = File.ReadAllText(templatePath);

                    html = html.Replace("{{name}}", $"{member.FirstName} {member.LastName}");
                    html = html.Replace("{{action_url}}", $"{BaseUrl}/login/ ");
                    html = html.Replace("{{username}}", member.EmailAddress);
                    html = html.Replace("{{password}}", member.Password);
                    html = html.Replace("{{addedBy}}", LoggedInMemberName);
                    html = html.Replace("{{addedOn}}", fmAssociation.CreatedOn.Value.ToString("dddd, dd MMMM yyyy hh:mm tt"));

                    if (relatedMember != null)
                        html = html.Replace("{{relation}}", $"{relationType} {relatedMember.FirstName} {relatedMember.LastName}");
                    else
                        html = html.Replace("{{relation}}", "Unknown relationship");

                    System.Threading.Tasks.Task.Factory.StartNew(() =>
                    {
                        using (SmtpClient sClient = new SmtpClient())
                        {
                            using (MailMessage mailMessage = new MailMessage("brahmkshatriyaportal@gmail.com", member.EmailAddress))
                            {
                                mailMessage.Body = html;
                                mailMessage.IsBodyHtml = true;
                                mailMessage.Subject = "Brahmkshatriya Online Portal - Notification";

                                sClient.Send(mailMessage);
                            }
                        }
                    });
                }
            }

            return Ok();
        }

        [Route("api/member/delete")]
        [HttpGet]
        public IHttpActionResult Delete(int familyId, int memberId)
        {
            if (!CanEditFamily(familyId))
                return BadRequest("You do not have permission to edit this member");

            bool logOut = false;

            using (bkContext context = new bkContext())
            {
                using (var tnx = context.Database.BeginTransaction())
                {
                    try
                    {
                        if (context.Families.Any(x => x.FamilyID == familyId && x.HeadOfFamilyID == memberId))
                            return BadRequest("Head Of Family cannot be deleted");

                        context.bk_DeleteMember(familyId, memberId);
                        tnx.Commit();
                    }
                    catch
                    {
                        tnx.Rollback();
                        throw;
                    }

                    //if we are deleting logged in member from family log out him if he is entirely deleted from system
                    if (memberId == LoggedInMemberId)
                        logOut = !context.Members.Any(x => x.MemberID == LoggedInMemberId);
                }
            }

            return Ok(logOut);
        }        

        [Route("api/member/approve")]
        [HttpGet]
        public IHttpActionResult Approve(int memberId, int familyId)
        {
            using (bkContext context = new bkContext())
            {
                if (!CanEditMember(memberId))
                    return BadRequest("You do not have rights to approve this member");

                FamilyMemberAssociation fmAssociation = context.FamilyMemberAssociations.FirstOrDefault(x => x.MemberId == memberId && x.FamilyId == familyId && !x.Approved);
                if (fmAssociation == null)
                    return BadRequest("No pending approval found");

                fmAssociation.Approved = true;
                fmAssociation.ApprovedBy = LoggedInMemberId;
                fmAssociation.ApprovedOn = DateTime.Now;

                context.SaveChanges();
            }

            return Ok();
        }

        [Route("api/member/decline")]
        [HttpGet]
        public IHttpActionResult Decline(int memberId, int familyId)
        {
            using (bkContext context = new bkContext())
            {
                if (!CanEditMember(memberId))
                    return BadRequest("You do not have rights to approve this member");

                FamilyMemberAssociation fmAssociation = context.FamilyMemberAssociations.FirstOrDefault(x => x.MemberId == memberId && x.FamilyId == familyId && !x.Approved);
                if (fmAssociation == null)
                    return BadRequest("No pending approval found");

                context.FamilyMemberAssociations.Remove(fmAssociation);

                context.SaveChanges();
            }

            return Ok();
        }

        [Route("api/member/markDefaultFamily")]
        [HttpGet]
        public IHttpActionResult MarkDefaultFamily(int familyId, int memberId)
        {
            using (bkContext context = new bkContext())
            {
                if (!CanEditMember(familyId, memberId))
                    return BadRequest("You do not have permission to edit this member");

                List<FamilyMemberAssociation> fmAssociations = context.FamilyMemberAssociations.Where(m => m.MemberId == memberId).ToList();

                if (context.Families.Any(x => x.FamilyID != familyId && x.HeadOfFamilyID == memberId))
                    return BadRequest("This member is Head Of Family in another family and cannot be marked default here");

                foreach (var item in fmAssociations)
                {
                    if (item.FamilyId == familyId)
                    {
                        item.DefaultFamily = true;
                        item.ModifiedBy = LoggedInMemberId;
                        item.ModifiedOn = DateTime.Now;
                    }
                    else if (item.DefaultFamily)
                    {
                        item.DefaultFamily = false;
                        item.ModifiedBy = LoggedInMemberId;
                        item.ModifiedOn = DateTime.Now;
                    }
                }

                context.SaveChanges();
            }

            return Ok();
        }

        [Route("api/member/search")]
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult Search(MemberSearchModel model)
        {
            string firstName = string.IsNullOrWhiteSpace(model.FirstName) ? null : model.FirstName.Trim();
            string lastName = string.IsNullOrWhiteSpace(model.LastName) ? null : model.LastName.Trim();
            int? categoryId = model.CategoryID.HasValue && model.CategoryID.Value > 0 ? model.CategoryID : null;
            int? nukhId = model.NukhID.HasValue && model.NukhID.Value > 0 ? model.NukhID : null;
            string city = string.IsNullOrWhiteSpace(model.City) ? null : model.City.Trim();
            string district = string.IsNullOrWhiteSpace(model.District) ? null : model.District.Trim();
            string state = string.IsNullOrWhiteSpace(model.State) ? null : model.State.Trim();
            string emailAddress = string.IsNullOrWhiteSpace(model.Email) ? null : model.Email.Trim();
            string phoneNumber = string.IsNullOrWhiteSpace(model.PhoneNumber) ? null : model.PhoneNumber.Trim();
            string sortOrder = string.IsNullOrWhiteSpace(model.SortOrder) ? null : model.SortOrder.Trim();
            int? currentPage = model.CurrentPage.HasValue && model.CurrentPage.Value > 0 ? model.CurrentPage : null;
            int? pageSize = model.PageSize.HasValue && model.PageSize.Value > 0 ? model.PageSize : null;
            int? memberId = model.MemberId > 0 ? model.MemberId : (int?) null;
            long? aadhaarNumber = model.AadhaarNumber > 0 ? model.AadhaarNumber : (long?)null;     
            bool includeOnlyHOF = model.IncludeOnlyHOF;

            MemberSearchResultModel mvm = new MemberSearchResultModel();

            using (bkContext context = new bkContext())
            {
                ObjectParameter oParameter = new ObjectParameter("TotalRecords", typeof(int));

                List<bk_MemberSearch_Result> results = context.bk_MemberSearch(firstName, lastName, categoryId, nukhId, city, district, state, emailAddress, phoneNumber, pageSize, currentPage, includeOnlyHOF, sortOrder, memberId, aadhaarNumber, oParameter).ToList();

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
                    item.Alive = result.Alive;
                    item.DOB = result.DOB;
                    item.DOD = result.DOD;
                    item.PhotoUrl = MemberWrapper.ProfilePhoto(result.MemberID, result.Gender, result.ModifiedOn);

                    mvm.Results.Add(item);
                }
            }

            return Ok(mvm);
        }

        [Route("api/member/uploadPhoto")]
        [HttpPost]
        public IHttpActionResult UploadPhoto(dynamic json)
        {
            dynamic model = JsonConvert.DeserializeObject<ExpandoObject>(json.ToString());
            int memberId = Convert.ToInt32(model.memberId);

            if (!CanEditMember(memberId))
                return BadRequest("You do not have permission to edit this member");

            if (string.IsNullOrWhiteSpace(model.image))
                return BadRequest("No image content provided");

            byte[] imageBytes = Convert.FromBase64String(model.image.Replace("data:image/jpeg;base64,", ""));

            using (MemoryStream stream = new MemoryStream(imageBytes))
            {
                Image img = Image.FromStream(stream);
                string filePath = System.Web.Hosting.HostingEnvironment.MapPath(string.Format(@"~/Images/Profiles/{0}.jpg", memberId));
                img.Save(filePath);
            }

            using (bkContext context = new bkContext())
            {
                Member member = context.Members.FirstOrDefault(x => x.MemberID == memberId);
                member.ModifiedBy = LoggedInMemberId;
                member.ModifiedOn = DateTime.Now;

                context.SaveChanges();
            }

            return Ok();
        }

        [Route("api/member/profilePhoto")]
        [HttpGet]
        public IHttpActionResult ProfilePhoto()
        {
            string url = "";
            DateTime? modifiedOn;
            bool gender;

            using (bkContext context = new bkContext())
            {
                Member member = context.Members.FirstOrDefault(x => x.MemberID == LoggedInMemberId);
                if (member != null)
                {
                    gender = member.Gender;
                    modifiedOn = member.ModifiedOn;

                    url = MemberWrapper.ProfilePhoto(LoggedInMemberId, gender, modifiedOn);
                }
            }

            return Ok(url);
        }

        [Route("api/member/defaultfamily")]
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult DefaultFamily(int memberId)
        {
            int familyId = 0;

            using (bkContext context = new bkContext())
            {
                familyId = context.FamilyMemberAssociations.Where(x => x.MemberId == memberId && x.DefaultFamily).Select(x => x.FamilyId).FirstOrDefault();
            }

            return Ok(familyId);
        }
    }
}


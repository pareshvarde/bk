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

                context.SaveChanges();
            }

            return Ok(true);
        }

        [Route("api/member")]
        [HttpGet]
        public IHttpActionResult Get(int memberId, int familyId)
        {
            using (bkContext context = new bkContext())
            {
                Member member = context.Members.Where(x => x.MemberID == memberId).FirstOrDefault();
                if (member == null)
                    return BadRequest("Your record cannot be loaded. Please try again or contact Administrator for help");

                List<FamilyMemberAssociation> fmAssociation = context.FamilyMemberAssociations.Where(x => x.FamilyId == familyId).ToList();

                MemberViewModel vm = new MemberViewModel()
                {
                    MemberID = member.MemberID,
                    FirstName = member.FirstName,
                    LastName = member.LastName,
                    NickName = member.NickName,
                    Email = member.EmailAddress,
                    PhoneNumber = member.Phone,
                    AadhaarNumber = member.AadhaarNumber,
                    Gender = member.Gender,
                    DOB = member.DOB,
                    BirthPlace = member.BirthPlace,
                    Alive = member.Alive,
                    DOD = member.DOD,
                    DeathPlace = member.DeathPlace,
                    EducationLevel = member.EducationLevel,
                    EducationField = member.EducationField,
                    OccupationId = member.OccupationID,
                    CompanyName = member.CompanyName,
                    JobTitle = member.JobTitle,
                    InstagramHandle = member.InstagramHandle,
                    FacebookHandle = member.FacebookHandle,
                    TwitterHandle = member.TwitterHandle,
                    Married = member.Married
                };

                FamilyMemberAssociation fma = fmAssociation.FirstOrDefault(x => x.MemberId == memberId);
                if (fma != null)
                {
                    vm.RelatedMemberId = fma.RelatedId;
                    vm.RelationTypeId = fma.RelationTypeId;
                }

                vm.canEdit = CanEditMember(fmAssociation, memberId);

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

            using (bkContext context = new bkContext())
            {
                Member member = null;

                if (model.MemberID.HasValue)
                {
                    member = context.Members.Where(x => x.MemberID == model.MemberID).FirstOrDefault();
                    if (member == null)
                        return BadRequest("Member record cannot be loaded. Please try again or contact Administrator for help");
                }
                else
                {
                    member = new Member();
                    context.Members.Add(member);
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
                member.EmailAddress = model.Email;
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
                member.Married = model.Married;

                if (model.FamilyId.HasValue)
                {
                    FamilyMemberAssociation mAssociation = member.FamilyMemberAssociations.Where(f => f.FamilyId == model.FamilyId.Value).FirstOrDefault();
                    if (mAssociation != null)
                        context.FamilyMemberAssociations.Remove(mAssociation);

                    member.FamilyMemberAssociations.Add(new FamilyMemberAssociation()
                    {
                        Approved = true,
                        FamilyId = model.FamilyId.Value,
                        RelatedId = model.RelatedMemberId,
                        RelationTypeId = model.RelationTypeId,
                        CreatedOn = DateTime.Now,
                        CreatedBy = LoggedInMemberId
                    });
                }

                context.SaveChanges();

                return Ok();
            }
        }

        [Route("api/member/addtofamily")]
        [HttpGet]
        public IHttpActionResult AddToFamily(int familyId, int memberId, int relatedId, int relationTypeId)
        {
            if (!CanEditFamily(familyId))
                return BadRequest("You do not have permission to edit this family");

            using (bkContext context = new bkContext())
            {
                Member member = context.Members.Include(x => x.FamilyMemberAssociations).FirstOrDefault(x => x.MemberID == memberId);
                if (member == null)
                    return BadRequest("Member cannot be located. Please try again later");

                Member relatedMember = context.Members.Include(x => x.FamilyMemberAssociations).FirstOrDefault(x => x.MemberID == relatedId);
                if (relatedMember == null)
                    return BadRequest("Related member cannot be located. Please try again later");

                if (member.FamilyMemberAssociations.Any(x => x.FamilyId == familyId))
                    return BadRequest("Member is already a part of selected family");

                if (!relatedMember.FamilyMemberAssociations.Any(x => x.FamilyId == familyId))
                    return BadRequest("Related member is not part of the family");

                lkRelationType relationType = context.lkRelationTypes.FirstOrDefault(x => x.RelationTypeId == relationTypeId);
                if (relationType == null)
                    return BadRequest("Invalid relation type");

                FamilyMemberAssociation fmAssociation = new FamilyMemberAssociation();
                fmAssociation.Approved = false;
                fmAssociation.CreatedBy = LoggedInMemberId;
                fmAssociation.CreatedOn = DateTime.Now;
                fmAssociation.FamilyId = familyId;
                fmAssociation.MemberId = memberId;
                fmAssociation.RelatedId = relatedId;
                fmAssociation.RelationTypeId = relationTypeId;

                context.FamilyMemberAssociations.Add(fmAssociation);
                context.SaveChanges();

                if (!string.IsNullOrWhiteSpace(member.EmailAddress))
                {
                    string templatePath = System.Web.Hosting.HostingEnvironment.MapPath("~/HtmlTemplates/familyAddition.html");
                    string html = File.ReadAllText(templatePath);

                    html = html.Replace("{{name}}", $"{member.FirstName} {member.LastName}");
                    html = html.Replace("{{action_url}}", $"{Properties.Settings.Default.BaseUrl.TrimEnd('/')}/login/ ");
                    html = html.Replace("{{username}}", member.EmailAddress);
                    html = html.Replace("{{password}}", member.Password);
                    html = html.Replace("{{addedBy}}", LoggedInMemberName);
                    html = html.Replace("{{addedOn}}", fmAssociation.CreatedOn.ToString("dddd, dd MMMM yyyy hh:mm tt"));
                    html = html.Replace("{{relation}}", $"{relationType.RelationType} Of {relatedMember.FirstName} {relatedMember.LastName}");

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
                }
            }

            return Ok();
        }

        [Route("api/member/basicsearch")]
        [HttpPost]
        public IHttpActionResult BasicSearch(MemberBasicSearchModel model)
        {
            int? memberId = model.MemberID.HasValue && model.MemberID.Value > 0 ? model.MemberID : null;
            string phoneNumber = string.IsNullOrWhiteSpace(model.PhoneNumber) ? null : model.PhoneNumber.Trim();
            long? aadhaarNumber = model.AadhaarNumber.HasValue && model.AadhaarNumber.Value > 0 ? model.AadhaarNumber : null;
            string emailAddress = string.IsNullOrWhiteSpace(model.EmailAddress) ? null : model.EmailAddress.Trim();

            MemberViewModel mvm = null;

            using (bkContext context = new bkContext())
            {
                bk_MemberSearchBasic_Result result = context.bk_MemberSearchBasic(memberId, phoneNumber, aadhaarNumber, emailAddress).FirstOrDefault();

                if (result != null)
                {
                    mvm = new MemberViewModel();
                    mvm.FirstName = result.FirstName;
                    mvm.LastName = result.LastName;
                    mvm.DOB = result.DOB;
                    mvm.MemberID = result.MemberID;
                    mvm.Gender = result.Gender;
                }
            }

            return Ok(mvm);
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

        [Route("api/member/search")]
        [HttpPost]
        public IHttpActionResult Search(MemberSearchModel model)
        {
            string firstName = string.IsNullOrWhiteSpace(model.FirstName) ? null : model.FirstName.Trim();
            string lastName = string.IsNullOrWhiteSpace(model.LastName) ? null : model.LastName.Trim();
            int? categoryId = model.CategoryID.HasValue && model.CategoryID.Value > 0 ? model.CategoryID : null;
            int? nukhId = model.NukhID.HasValue && model.NukhID.Value > 0 ? model.NukhID : null;
            string city = string.IsNullOrWhiteSpace(model.City) ? null : model.City.Trim();
            string state = string.IsNullOrWhiteSpace(model.State) ? null : model.State.Trim();
            string emailAddress = string.IsNullOrWhiteSpace(model.Email) ? null : model.Email.Trim();
            string phoneNumber = string.IsNullOrWhiteSpace(model.PhoneNumber) ? null : model.PhoneNumber.Trim();
            int? currentPage = model.CurrentPage.HasValue && model.CurrentPage.Value > 0 ? model.CurrentPage : null;
            int? pageSize = model.PageSize.HasValue && model.PageSize.Value > 0 ? model.PageSize : null;

            List<MemberSearchResultModel> mvm = new List<MemberSearchResultModel>();

            using (bkContext context = new bkContext())
            {
                List<bk_MemberSearch_Result> result = context.bk_MemberSearch(firstName, lastName, categoryId, nukhId, city, state, emailAddress, phoneNumber,pageSize, currentPage).ToList();

                foreach (var item in result)
                {
                    mvm.Add(new MemberSearchResultModel()
                    {
                        Adderess2 = item.Address2,
                        Address1 = item.Address1,
                        City = item.City,
                        Country = item.Country,
                        FamilyId = item.FamilyID,
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        MemberId = item.MemberID,
                        State = item.State,
                        Gender = item.Gender                         
                    });
                }
            }

            return Ok(mvm);
        }
    }
}


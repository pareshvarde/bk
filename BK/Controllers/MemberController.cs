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
        public IHttpActionResult Get(int? memberId, int familyId)
        {
            using (bkContext context = new bkContext())
            {
                int id = LoggedInMemberId;                
                if (memberId.HasValue)
                    id = memberId.Value;

                Member member = context.Members.Where(x => x.MemberID == id).FirstOrDefault();
                if (member == null)
                    return BadRequest("Your record cannot be loaded. Please try again or contact Administrator for help");

                FamilyMemberAssociation fma = member.FamilyMemberAssociations.FirstOrDefault(x => x.FamilyId == familyId);                

                MemberViewModel vm = new MemberViewModel() {
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
                    CompanyName = member.CompanyName,
                    JobTitle = member.JobTitle,
                    InstagramHandle = member.InstagramHandle,
                    FacebookHandle = member.FacebookHandle,
                    TwitterHandle = member.TwitterHandle,
                    Married = member.Married
                };

                if (fma != null)
                {
                    vm.RelatedMemberId = fma.RelatedId;
                    vm.RelationTypeId = fma.RelationTypeId;
                }
                                   
                return Ok(vm);
            }
        }

        [Route("api/member/save")]
        [HttpPost]
        public IHttpActionResult Save(MemberViewModel model)
        {
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

                    member.FamilyMemberAssociations.Add(new FamilyMemberAssociation() {
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

        [Route("api/member/delete")]
        [HttpGet]
        public IHttpActionResult Delete(int familyId, int memberId)
        {
            using (bkContext context = new bkContext())
            {
                Member member = context.Members.FirstOrDefault(x => x.MemberID == memberId);
                if (member == null)
                    return BadRequest("Member profile cannot be loaded. Please try again later");

                List<FamilyMemberAssociation> mAssociations = context.FamilyMemberAssociations.Where(x => x.MemberId == memberId).ToList();
                Family family = context.Families.Where(x => x.FamilyID == familyId).FirstOrDefault();                
                FamilyMemberAssociation currentAssociation = mAssociations.Where(x => x.FamilyId == familyId).FirstOrDefault();

                if (currentAssociation == null)
                    return BadRequest("Member association to current family cannot be loaded. Please try again later");

                context.FamilyMemberAssociations.Remove(currentAssociation);

                if (mAssociations.Count == 1)
                    context.Members.Remove(member);

                if (family.FamilyMemberAssociations.Count == 1)
                    context.Families.Remove(family);                

                context.SaveChanges();
            }

            return Ok();
        }
    }
}

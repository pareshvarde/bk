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
        [Route("api/changePassword")]
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

        [Route("api/getMember")]
        [HttpGet]
        public IHttpActionResult GetMember(int? memberId, int familyId)
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

        [Route("api/saveMember")]
        [HttpPost]
        public IHttpActionResult SaveMember(MemberViewModel model)
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

    }
}

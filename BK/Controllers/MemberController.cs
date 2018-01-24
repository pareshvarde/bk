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

        [Route("api/getProfile")]
        [HttpGet]
        public IHttpActionResult GetProfile()
        {
            using (bkContext context = new bkContext())
            {
                Member member = context.Members.Where(x => x.MemberID == LoggedInMemberId).FirstOrDefault();
                if (member == null)
                    return BadRequest("Your record cannot be loaded. Please try again or contact Administrator for help");

                ProfileViewModel vm = new ProfileViewModel() {
                    FirstName = member.FirstName,
                    LastName = member.LastName,
                    NickName = member.NickName,
                    Email = member.EmailAddress,
                    PhoneNumber = member.Phone,
                    AadhaarNumber = member.AadhaarNumber,
                    Gender = member.Gender,
                    DOB = member.DOB,
                    Alive = member.Alive,
                    DOD = member.DOD,
                    DeathPlace = member.DeathPlace,
                    EducationLevel = member.EducationLevel,
                    EducationField = member.EducationField,
                    CompanyName = member.WorkingWith,
                    JobTitle = member.JobTitle,
                    InstagramHandle = member.InstagramHandle,
                    FacebookHandle = member.FacebookHandle,
                    TwitterHandle = member.TwitterHandle
                };
                                   
                return Ok(vm);
            }
        }
    }
}

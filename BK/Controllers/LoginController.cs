using BK.Utility;
using BK.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BK.Context;
using System.IO;
using System.Net.Mail;
using System.Reflection;

namespace BK.Controllers
{
    public class LoginController : ApiController
    {
        [Route("api/register")]
        [HttpPost]
        public IHttpActionResult Register(RegisterViewModel register)
        {
            using (bkContext context = new bkContext())
            {
                if (context.Members.Any(f => f.EmailAddress == register.EmailAddress.Trim()))
                    return BadRequest("Email address already registered. Please use forgot password on login page to recover your account");

                if (context.Members.Any(f => f.Phone == register.PhoneNumber.Trim()))
                    return BadRequest("Phone number already registered. Please contact Administrator for help");

                if (register.AadhaarNumber.HasValue)
                    if (context.Members.Any(f => f.AadhaarNumber == register.AadhaarNumber))
                        return BadRequest("Aadhar number already registered. Please contact Administrator for help");

                Family family = new Family();
                family.FamilySID = IDGenerator.CreateSID(IDGenerator.Prefixes.FAMILY);
                family.Address1 = register.Address1;
                family.Address2 = register.Address2;
                family.City = register.City;
                family.State = register.State;
                family.PostalCode = register.PostalCode;
                family.Country = register.Country;
                family.CategoryID = register.CategoryId;
                family.NukhID = register.NukhId;                

                Member member = new Member();
                member.FirstName = register.FirstName;
                member.LastName = register.LastName;
                member.DOB = register.DateOfBirth;
                member.EmailAddress = register.EmailAddress;
                member.Phone = register.PhoneNumber;
                member.AadhaarNumber = register.AadhaarNumber;
                member.Gender = register.Gender;
                member.Password = System.Web.Security.Membership.GeneratePassword(8, 2);
                member.MemberSID = IDGenerator.CreateSID(IDGenerator.Prefixes.MEMBER);
                member.Active = true;

                FamilyMemberAssociation fmAssociation = new FamilyMemberAssociation();
                fmAssociation.Member = member;
                fmAssociation.Family = family;
                fmAssociation.HeadOfFamily = true;
                fmAssociation.Approved = true;                
                fmAssociation.CreatedBy = 0;

                context.Families.Add(family);
                context.Members.Add(member);
                context.FamilyMemberAssociations.Add(fmAssociation);

                context.SaveChanges();

                string templatePath = System.Web.Hosting.HostingEnvironment.MapPath("~/HtmlTemplates/welcome.html");
                string html = File.ReadAllText(templatePath);

                html = html.Replace("{{name}}", $"{member.FirstName} {member.LastName}");
                html = html.Replace("{{action_url}}", $"{Properties.Settings.Default.BaseUrl.TrimEnd('/')}/login/ ");
                html = html.Replace("{{username}}", member.EmailAddress);
                html = html.Replace("{{password}}", member.Password);

                MailMessage mailMessage = new MailMessage("brahmkshatriyaportal@gmail.com", member.EmailAddress);
                mailMessage.Body = html;
                mailMessage.IsBodyHtml = true;
                mailMessage.Subject = "Brahmkshatriya Online Portal - Welcome Letter";

                using (SmtpClient sClient = new SmtpClient())
                {
                    sClient.Send(mailMessage);
                }
            }

            return Ok();
        }

        [Route("api/isEmailAvailable")]
        public IHttpActionResult IsEmailAvailable(string emailAddress)
        {
            using (bkContext context = new bkContext())
            {
                if (context.Members.Any(m => m.EmailAddress == emailAddress))
                    return Ok(false);
                else
                    return Ok(true);
            }
        }

        [Route("api/sendResetPasswordEmail")]
        [HttpGet]
        public IHttpActionResult SendResetPasswordEmail(string emailAddress)
        {
            using (bkContext context = new bkContext())
            {
                if (!context.Members.Any(m => m.EmailAddress == emailAddress))
                    return BadRequest("Email address is not registered");

                Member member = context.Members.FirstOrDefault(m => m.EmailAddress == emailAddress);
                if (member == null)
                    return BadRequest("Your account information cannot be loaded. Please contact Administrator for help");

                member.PasswordUID = Guid.NewGuid();
                context.SaveChanges();

                string templatePath = System.Web.Hosting.HostingEnvironment.MapPath("~/HtmlTemplates/password_reset.html");
                string html = File.ReadAllText(templatePath);

                html = html.Replace("{{name}}", $"{member.FirstName} {member.LastName}");
                html = html.Replace("{{action_url}}", $"{Properties.Settings.Default.BaseUrl.TrimEnd('/')}/resetPassword/{member.PasswordUID.Value.ToString()} ");

                MailMessage mailMessage = new MailMessage("brahmkshatriyaportal@gmail.com", member.EmailAddress);
                mailMessage.Body = html;
                mailMessage.IsBodyHtml = true;
                mailMessage.Subject = "Brahmkshatriya Online Portal - Password Reset";

                using (SmtpClient sClient = new SmtpClient())
                {
                    sClient.Send(mailMessage);
                }
            }

            return Ok(true);
        }

        [Route("api/resetPassword")]
        [HttpGet]
        public IHttpActionResult ResetPassword(string password, string token)
        {
            using (bkContext context = new bkContext())
            {
                Guid resetToken = new Guid();
                if (!Guid.TryParse(token, out resetToken))
                    return BadRequest("Invalid Token, please regenerate your password reset request");

                Member member = context.Members.FirstOrDefault(m => m.PasswordUID == resetToken);

                if (member == null)
                    return BadRequest("Invalid Token, please regenerate your password reset request");

                member.PasswordUID = null;
                member.Password = password;

                context.SaveChanges();
            }

            return Ok(true);
        }
    }
}


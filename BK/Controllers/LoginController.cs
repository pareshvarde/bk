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
        public IHttpActionResult Register(Register register)
        {
            //using (bkContext context = new bkContext())
            //{
            //    if (context.familymembers.Any(f => f.EmailAddress == register.EmailAddress.Trim()))
            //        return BadRequest("Email address already registered");

            //    List<login> logins = new List<login>();
            //    logins.Add(new login()
            //    {
            //        Active = true,
            //        Password = register.Password
            //    });

            //    family fam = new family();
            //    fam.FamilyNumber = IDGenerator.CreateSID(IDGenerator.Prefixes.FAMILY);

            //    fam.familymembers.Add(new familymember()
            //    {
            //        EmailAddress = register.EmailAddress,
            //        FirstName = register.FirstName,
            //        LastName = register.LastName,
            //        Gender = register.Male,
            //        logins = logins
            //    });

            //    context.families.Add(fam);

            //    context.SaveChanges();

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
    }
}


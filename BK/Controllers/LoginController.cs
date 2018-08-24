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
using System.Text.RegularExpressions;
using System.Web;
using BK.Properties;
using System.Text;

namespace BK.Controllers
{
    public class LoginController : BaseController
    {
        [Route("api/register")]
        [HttpPost]
        public IHttpActionResult Register(RegisterViewModel register)
        {
            if (!VerifyCaptcha(register.CaptchaResponse))
                return BadRequest("Please refresh page and try again");

            using (bkContext context = new bkContext())
            {
                if (context.Members.Any(f => f.EmailAddress == register.EmailAddress.Trim()))
                    return BadRequest("Email address already registered. Please use forgot password on login page to recover your account");

                if (context.Members.Any(f => f.Phone == register.PhoneNumber.Trim()))
                    return BadRequest("Phone number already registered. Please contact Administrator for help");

                if (register.AadhaarNumber.HasValue)
                    if (context.Members.Any(f => f.AadhaarNumber == register.AadhaarNumber))
                        return BadRequest("Aadhar number already registered. Please contact Administrator for help");

                Member member = new Member();
                member.FirstName = register.FirstName;
                member.LastName = register.LastName;
                member.DOB = register.DateOfBirth;
                member.EmailAddress = register.EmailAddress.Trim();
                member.Phone = register.PhoneNumber;
                member.AadhaarNumber = register.AadhaarNumber;
                member.Gender = register.Gender;
                member.MaritalStatusID = 2; //MARRIED

                string tPassword = System.Web.Security.Membership.GeneratePassword(8, 0);
                tPassword = Regex.Replace(tPassword, @"[^a-zA-Z0-9]", m => "9");
                member.Password = tPassword;

                member.Alive = true;
                member.Active = true;
                member.CreatedOn = DateTime.Now;

                Family family = new Family();
                family.Address1 = register.Address1;
                family.Address2 = register.Address2;
                family.City = register.City;
                family.District = register.District;
                family.State = register.State;
                family.PostalCode = register.PostalCode;
                family.Country = register.Country;
                family.CategoryID = register.CategoryId;
                family.NukhID = register.NukhId;
                family.Member = member;
                family.CreatedOn = DateTime.Now;

                FamilyMemberAssociation fmAssociation = new FamilyMemberAssociation();
                fmAssociation.Member = member;
                fmAssociation.Family = family;
                fmAssociation.Approved = true;
                fmAssociation.DefaultFamily = true;
                fmAssociation.CreatedOn = DateTime.Now;

                context.Families.Add(family);
                context.Members.Add(member);
                context.FamilyMemberAssociations.Add(fmAssociation);

                context.SaveChanges();

                string templatePath = System.Web.Hosting.HostingEnvironment.MapPath("~/HtmlTemplates/welcome.html");
                string html = File.ReadAllText(templatePath);

                html = html.Replace("{{name}}", $"{member.FirstName} {member.LastName}");
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

            return Ok();
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
                html = html.Replace("{{action_url}}", $"{BaseUrl}/resetpassword/{member.PasswordUID.Value.ToString()} ");

                System.Threading.Tasks.Task.Factory.StartNew(() =>
                {
                    using (SmtpClient sClient = new SmtpClient())
                    {
                        using (MailMessage mailMessage = new MailMessage("brahmkshatriyaportal@gmail.com", member.EmailAddress))
                        {
                            mailMessage.Body = html;
                            mailMessage.IsBodyHtml = true;
                            mailMessage.Subject = "Brahmkshatriya Online Portal - Password Reset";

                            sClient.Send(mailMessage);
                        }
                    }
                });
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
                member.ModifiedOn = DateTime.Now;
                member.ModifiedBy = member.MemberID;

                context.SaveChanges();
            }

            return Ok(true);
        }

        [Route("api/feedback")]
        [HttpPost]
        public IHttpActionResult Feedback()
        {
            string name = HttpContext.Current.Request.Params["name"];
            string email = HttpContext.Current.Request.Params["email"];
            string phone = HttpContext.Current.Request.Params["phone"];
            string subject = HttpContext.Current.Request.Params["subject"];
            string content = HttpContext.Current.Request.Params["content"];

            if (string.IsNullOrWhiteSpace(name))
                return BadRequest("Please provide your name");

            if (string.IsNullOrWhiteSpace(email))
                return BadRequest("Please provide your email address");

            if (string.IsNullOrWhiteSpace(phone))
                return BadRequest("Please provide your phone number");

            if (string.IsNullOrWhiteSpace(subject))
                return BadRequest("Please provide subject for your feedback");

            if (string.IsNullOrWhiteSpace(content))
                return BadRequest("Please provide detail for your feedback");

            HttpPostedFile postedFile = null;

            if (HttpContext.Current.Request.Files.Count > 0)
                postedFile = HttpContext.Current.Request.Files[0];

            using (SmtpClient sClient = new SmtpClient())
            {
                using (MailMessage mailMessage = new MailMessage())
                {
                    StringBuilder builder = new StringBuilder();
                    builder.AppendLine("New Contact Us request has been submitted details as follows.<br/><br/>");

                    builder.AppendLine($"Name: {name}<br/>");
                    builder.AppendLine($"Email: {email}<br/>");
                    builder.AppendLine($"Phone: {phone}<br/><br/>");

                    builder.AppendLine($"Detail: {content}<br/>");

                    foreach (var address in Settings.Default.SupportEmails.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                        mailMessage.To.Add(address);

                    mailMessage.From = new MailAddress("brahmkshatriyaportal@gmail.com");
                    mailMessage.Body = builder.ToString();
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Subject = $"Brahmkshatriya - {subject}";

                    if (postedFile != null)
                    {
                        Attachment attachment = new Attachment(postedFile.InputStream, postedFile.FileName, postedFile.ContentType);
                        mailMessage.Attachments.Add(attachment);
                    }

                    sClient.Send(mailMessage);
                }
            }

            return Ok();
        }

        private bool VerifyCaptcha(string response)
        {
            if (string.IsNullOrWhiteSpace(response))
                return false;

            string privateKey = "6LfMDkQUAAAAAP1j6rZuMVsN1VGP92-_NCkcNcp1";

            var client = new System.Net.WebClient();
            var reply = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", privateKey, response));
            var captchaResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(reply);

            return captchaResponse.success;
        }

        [Route("api/audit")]
        [HttpGet]
        public IHttpActionResult Audit()
        {
            Jobs.AuditJob auditJob = new Jobs.AuditJob();
            auditJob.Execute();

            return Ok();
        }
    }
}


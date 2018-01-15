using BK.Utility;
using BK.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

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
    }
}


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
    public class LoginController : ApiController
    {
        public IHttpActionResult Register(Register register)
        {
            return null;
        }

        public IHttpActionResult EmailAddressAvailable(string email)
        {
            using (bkContext context = new bkContext())
            {
                if (context.familymembers.Any(f => f.EmailAddress == email.Trim()))
                    return Ok(false);
                else
                    return Ok(true);
            }
        }
    }
}

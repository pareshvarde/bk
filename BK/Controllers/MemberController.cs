using BK.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BK.Controllers
{
    public class MemberController : ApiController
    {
        [Route("api/changePassword")]
        [HttpPost]
        public IHttpActionResult ChangePassword(ChangePasswordViewModel model)
        {
            return Ok(true);
        }
    }
}

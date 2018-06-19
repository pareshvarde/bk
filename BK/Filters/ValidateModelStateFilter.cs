using BK.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace BK.Filters
{
    public class ValidateModelStateFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.ModelState.IsValid)
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, actionContext.ModelState);

            if (HttpContext.Current.User.Identity.IsAuthenticated)            
            {
                ClaimsPrincipal principal = actionContext.Request.GetRequestContext().Principal as ClaimsPrincipal;
                int memberId = Convert.ToInt32(principal.Claims.Where(c => c.Type == "memberId").Single().Value);

                using (bkContext context = new bkContext())
                {
                    if (!context.Members.Any(x => x.MemberID == memberId))
                        actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Your token has been revoked");
                }
            }
        }
    }
}
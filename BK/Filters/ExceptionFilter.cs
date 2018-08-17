using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http.Filters;

namespace BK.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            string exceptionMessage = string.Empty;
            if (actionExecutedContext.Exception.InnerException == null)            
                exceptionMessage = actionExecutedContext.Exception.Message;            
            else            
                exceptionMessage = actionExecutedContext.Exception.InnerException.Message;

            int memberId = GetLoggedInMemberId(actionExecutedContext);
            actionExecutedContext.Exception.Data.Add("MemberID", memberId);

            //log this exception message 
            AppLogger.LogException(actionExecutedContext.Exception);

            var response = new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent("An unhandled exception was thrown by service."),
                ReasonPhrase = exceptionMessage
            };
            actionExecutedContext.Response = response;
        }

        private int GetLoggedInMemberId(HttpActionExecutedContext actionExecutedContext)
        {
            try
            {
                ClaimsPrincipal principal = actionExecutedContext.Request.GetRequestContext().Principal as ClaimsPrincipal;
                return Convert.ToInt32(principal.Claims.Where(c => c.Type == "memberId").Single().Value);
            }
            catch
            {
                return 0;
            }
        }
    }
}
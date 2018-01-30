using BK.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace BK.Controllers
{
    public class BaseController : ApiController
    {
        protected int LoggedInMemberId
        {
            get
            {
                ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
                return Convert.ToInt32(principal.Claims.Where(c => c.Type == "memberId").Single().Value);                
            }
        }

        protected bool CanEditFamily(int familyId)
        {
            using (bkContext context = new bkContext())
            {
                return context.FamilyMemberAssociations.Any(x => x.MemberId == LoggedInMemberId && x.FamilyId == familyId && x.Approved);
            }            
        }

        protected bool CanEditMember(int familyId, int memberId)
        {
            using (bkContext context = new bkContext())
            {
                List<FamilyMemberAssociation> fmAssociation = context.FamilyMemberAssociations.Where(x => x.FamilyId == familyId).ToList();

                return fmAssociation.Any(x => x.MemberId == LoggedInMemberId && x.Approved) &&
                       fmAssociation.Any(x => x.MemberId == memberId && x.Approved);                
            }
        }
    }
}

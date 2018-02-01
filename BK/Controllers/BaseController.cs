using BK.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Data.Entity;

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

        protected string LoggedInMemberName
        {
            get
            {
                ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
                return principal.Claims.Where(c => c.Type == "name").Single().Value;
            }
        }

        protected bool CanEditFamily(int familyId)
        {
            using (bkContext context = new bkContext())
            {
                List<FamilyMemberAssociation> fmAssociation = context.FamilyMemberAssociations.Where(x => x.FamilyId == familyId).ToList();

                return CanEditFamily(fmAssociation);                
            }            
        }

        protected bool CanEditMember(int familyId, int memberId)
        {
            using (bkContext context = new bkContext())
            {
                List<FamilyMemberAssociation> fmAssociation = context.FamilyMemberAssociations.Where(x => x.FamilyId == familyId).ToList();

                return CanEditMember(fmAssociation, memberId);
            }
        }

        protected bool CanApproveMember(int memberId)
        {
            using (bkContext context = new bkContext())
            {
                Member member = context.Members.Include(x => x.FamilyMemberAssociations).FirstOrDefault(x => x.MemberID == memberId);
                if (member == null)
                    return false;                

                return member.FamilyMemberAssociations.Any(x => x.MemberId == LoggedInMemberId && x.Approved);                
            }
        }

        protected bool CanEditMember(List<FamilyMemberAssociation> fAssociations, int memberId)
        {
            bool canEdit = fAssociations.Any(x => x.MemberId == LoggedInMemberId) &&
                       fAssociations.Any(x => x.MemberId == memberId && (x.MemberId == LoggedInMemberId || x.Approved));

            return canEdit;
        }

        protected bool CanEditFamily(List<FamilyMemberAssociation> fAssociations)
        {
            bool canEdit = fAssociations.Any(x => x.MemberId == LoggedInMemberId);

            return canEdit;
        }
    }
}

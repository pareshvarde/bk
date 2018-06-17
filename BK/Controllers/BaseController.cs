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

        protected string LoggedInMemberFullName
        {
            get
            {
                ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
                return principal.Claims.Where(c => c.Type == "fullname").Single().Value;                
            }
        }

        protected string BaseUrl
        {
            get
            {
                return string.Format("{0}://{1}", Request.RequestUri.Scheme, Request.RequestUri.Host);                
            }
        }

        protected bool CanEditFamily(int familyId)
        {
            using (bkContext context = new bkContext())
            {
                Family family = context.Families.Where(x => x.FamilyID == familyId).FirstOrDefault();

                return CanEditFamily(family);
            }
        }

        protected bool CanEditFamily(Family family)
        {
            using (bkContext context = new bkContext())
            {
                bool canEdit = family.FamilyMemberAssociations.Any(x => x.MemberId == LoggedInMemberId) || family.CreatedBy == LoggedInMemberId;

                return canEdit;
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

        protected bool CanEditMember(int memberId)
        {
            using (bkContext context = new bkContext())
            {
                bool iCreatedMember = context.Members.Any(x => x.MemberID == memberId && x.CreatedBy == LoggedInMemberId);
                List<int> fma1 = context.FamilyMemberAssociations.Where(x => x.MemberId == memberId && x.Approved).Select(x => x.FamilyId).ToList();
                List<int> fma2 = context.FamilyMemberAssociations.Where(x => x.MemberId == LoggedInMemberId && x.Approved).Select(x => x.FamilyId).ToList();

                return fma1.Intersect(fma2).Any() || iCreatedMember;
            }
        }

        protected bool CanEditMember(List<FamilyMemberAssociation> fAssociations, int memberId)
        {
            bool iCreatedFamily = false;
            bool iCreatedMember = false;

            using (bkContext context = new bkContext())
            {
                iCreatedMember = context.Members.Any(x => x.MemberID == memberId && x.CreatedBy == LoggedInMemberId);
                iCreatedFamily = fAssociations.FirstOrDefault().Family.CreatedBy == LoggedInMemberId;
            }


            bool canEdit = fAssociations.Any(x => x.MemberId == LoggedInMemberId) &&
                       fAssociations.Any(x => x.MemberId == memberId && (x.MemberId == LoggedInMemberId || x.Approved));

            canEdit = canEdit || (iCreatedMember && iCreatedFamily);

            return canEdit;
        }
    }
}

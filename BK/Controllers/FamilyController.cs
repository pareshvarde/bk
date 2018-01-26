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
    [Authorize]
    public class FamilyController : BaseController
    {

        [Route("api/familyLookup")]
        [HttpGet]
        public IHttpActionResult GetFamliyLookup()
        {
            using (bkContext context = new bkContext())
            {
                var result = (from m in context.Members.Where(x => x.MemberID == LoggedInMemberId)
                              join mfa in context.FamilyMemberAssociations.Where(x => x.HeadOfFamily) on m.MemberID equals mfa.MemberId
                              join f in context.Families on mfa.FamilyId equals f.FamilyID
                              select new
                              {
                                  f.FamilyID,
                                  f.FamilySID,
                                  m.FirstName,
                                  m.LastName                                  
                              }).ToList();

                List<FamilyLookupViewModel> response = new List<FamilyLookupViewModel>();

                foreach (var item in result)
                {
                    response.Add(new FamilyLookupViewModel()
                    {
                        FamilyID = item.FamilyID,
                        FamilySID = item.FamilySID,
                        HeadOfFamily = $"{item.FirstName} {item.LastName}"

                    });
                }

                return Ok(response);
            }            
        }
    }
}

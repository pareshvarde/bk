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

        [Route("api/family")]
        [HttpGet]
        public IHttpActionResult GetFamily(int familyId)
        {
            using (bkContext context = new bkContext())
            {
                Family f = context.Families.Where(x => x.FamilyID == familyId).FirstOrDefault();
                if (f == null)
                    return BadRequest("Family record cannot be loaded.");

                List<bk_GetFamilyMembers_Result> members =  context.bk_GetFamilyMembers(familyId).ToList();              

                FamilyViewModel fvm = new FamilyViewModel();
                fvm.Address1 = f.Address1;
                fvm.Address2 = f.Address2;
                fvm.CategoryID = f.CategoryID;
                fvm.City = f.City;
                fvm.Country = f.Country;
                fvm.FamilyID = f.FamilyID;
                fvm.NukhID = f.NukhID;
                fvm.PostalCode = f.PostalCode;
                fvm.State = f.State;

                foreach(var item in members)
                {
                    var tmp = new FamilyMemberViewModel();

                    tmp.DOB = item.DOB;
                    tmp.HOF = item.HeadOfFamily;
                    tmp.Married = item.Married;
                    tmp.MemberID = item.MemberID;
                    tmp.Name = $"{item.FirstName} {item.LastName}";

                    if (!string.IsNullOrEmpty(item.RelationType))
                        tmp.Relation = $"{item.RelationType} Of {item.rFirstName} {item.rLastName}";

                    fvm.Members.Add(tmp);
                }

                return Ok(fvm);
            }            
        }

        [Route("api/saveFamily")]
        [HttpPost]
        public IHttpActionResult SaveFamily(FamilyViewModel model)
        {
            using (bkContext context = new bkContext())
            {
                Family family = context.Families.Where(f => f.FamilyID == model.FamilyID).FirstOrDefault();
                if (family == null)
                    return BadRequest("Family record cannot be loaded. Please try again later");

                family.Address1 = model.Address1;
                family.Address2 =  model.Address2;
                family.CategoryID = model.CategoryID;
                family.City =  model.City;
                family.Country = model.Country;
                family.NukhID = model.NukhID;
                family.PostalCode =  model.PostalCode;
                family.State =  model.State;

                context.SaveChanges();
            }

            return Ok();
        }
    }
}

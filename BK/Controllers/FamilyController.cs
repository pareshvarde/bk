﻿using BK.Context;
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

        [Route("api/family/lookup")]
        [HttpGet]
        public IHttpActionResult GetLookup(int memberId)
        {
            using (bkContext context = new bkContext())
            {
                var result = (from f in context.Families
                              join fma in context.FamilyMemberAssociations.Where(x => x.MemberId == memberId) on f.FamilyID equals fma.FamilyId
                              join m in context.Members on f.HeadOfFamilyID equals m.MemberID
                              select new
                              {
                                  f.FamilyID,
                                  m.FirstName,
                                  m.LastName
                              }).Distinct().ToList();

                List<FamilyLookupViewModel> response = new List<FamilyLookupViewModel>();

                foreach (var item in result)
                {
                    response.Add(new FamilyLookupViewModel()
                    {
                        FamilyID = item.FamilyID,
                        HeadOfFamily = $"{item.FirstName} {item.LastName}"

                    });
                }

                return Ok(response);
            }
        }

        [Route("api/family")]
        [HttpGet]
        public IHttpActionResult Get(int familyId)
        {
            using (bkContext context = new bkContext())
            {
                Family f = context.Families.Where(x => x.FamilyID == familyId).FirstOrDefault();
                if (f == null)
                    return BadRequest("Family record cannot be loaded.");

                List<bk_GetFamilyMembers_Result> members = context.bk_GetFamilyMembers(familyId).ToList();

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
                fvm.HeadOfFamilyID = f.HeadOfFamilyID;
                fvm.CanEdit = CanEditFamily(f.FamilyMemberAssociations.ToList());                

                Member hofMember = f.Member;
                if (hofMember != null)
                {
                    fvm.HeadOfFirstName = hofMember.FirstName;
                    fvm.HeadOfLastName = hofMember.LastName;
                }

                foreach (var item in members)
                {
                    var tmp = new FamilyMemberViewModel();

                    tmp.DOB = item.DOB;
                    tmp.Married = item.Married;
                    tmp.MemberID = item.MemberID;
                    tmp.Name = $"{item.FirstName} {item.LastName}";
                    tmp.CanEdit = CanEditMember(f.FamilyMemberAssociations.ToList(), item.MemberID);
                    tmp.Gender = item.Gender;                    

                    if (!string.IsNullOrEmpty(item.RelationType))
                        tmp.Relation = $"{item.RelationType} Of {item.rFirstName} {item.rLastName}";

                    fvm.Members.Add(tmp);
                }

                List<bk_PendingApprovals_Result> approvals = context.bk_PendingApprovals(LoggedInMemberId).ToList();
                foreach (var item in approvals)
                {
                    var tmp = new PendingApprovalViewModel();

                    tmp.AddedByFirstName = item.AddedByFirstName;
                    tmp.AddedById = item.AddedById;
                    tmp.AddedByLastName = item.AddedByLastName;
                    tmp.AddedOn = item.AddedOn;
                    tmp.AddedToFirstName = item.AddedToFirstName;
                    tmp.AddedToId = item.AddedToId;
                    tmp.AddedToLastName = item.AddedToLastName;
                    tmp.FamilyId = item.FamilyId;

                    fvm.PendingApprovals.Add(tmp);
                }

                return Ok(fvm);
            }
        }

        [Route("api/family/save")]
        [HttpPost]
        public IHttpActionResult Save(FamilyViewModel model)
        {
            if (!CanEditFamily(model.FamilyID))
                return BadRequest("You do not have permission to edit this family");

            using (bkContext context = new bkContext())
            {
                Family family = context.Families.Where(f => f.FamilyID == model.FamilyID).FirstOrDefault();
                if (family == null)
                    return BadRequest("Family record cannot be loaded. Please try again later");

                family.Address1 = model.Address1;
                family.Address2 = model.Address2;
                family.CategoryID = model.CategoryID;
                family.City = model.City;
                family.Country = model.Country;
                family.NukhID = model.NukhID;
                family.PostalCode = model.PostalCode;
                family.State = model.State;
                family.HeadOfFamilyID = model.HeadOfFamilyID;

                context.SaveChanges();
            }

            return Ok();
        }

        [Route("api/family/delete")]
        [HttpPost]
        public IHttpActionResult Delete(FamilyViewModel model)
        {
            if (!CanEditFamily(model.FamilyID))
                return BadRequest("You do not have rights to delete this family");

            using (bkContext context = new bkContext())
            {
                using (var tnx = context.Database.BeginTransaction())
                {
                    try
                    {
                        context.bk_DeleteFamily(model.FamilyID);
                        tnx.Commit();
                    }
                    catch
                    {
                        tnx.Rollback();
                        throw;
                    }
                }
            }

            return Ok();
        }

        [Route("api/family/fork")]
        [HttpPost]
        public IHttpActionResult Fork(FamilyViewModel model)
        {
            if (!CanEditFamily(model.FamilyID))
                return BadRequest("You do not have permission to manage this family");

            if (model.Members.Where(x => x.Selected).Count() == 0)
                return BadRequest("No valid members provided for fork family");

            using (bkContext context = new bkContext())
            {
                Family family = context.Families.FirstOrDefault(x => x.FamilyID == model.FamilyID);
                List<FamilyMemberAssociation> fmAssociations = family.FamilyMemberAssociations.Where(x => x.Approved).ToList();

                foreach (var item in model.Members)
                    if (!fmAssociations.Any(x => x.MemberId == item.MemberID))
                        return BadRequest("Invalid members supplied for the family");

                if (!fmAssociations.Any(x => x.MemberId == model.HeadOfFamilyID))
                    return BadRequest("Invalid Head of Family supplied for the family");

                Family newFam = new Family();
                newFam.Address1 = model.Address1;
                newFam.Address2 = model.Address2;
                newFam.City = model.City;
                newFam.State = model.State;
                newFam.PostalCode = model.PostalCode;
                newFam.Country = model.Country;
                newFam.CategoryID = model.CategoryID;
                newFam.NukhID = model.NukhID;
                newFam.HeadOfFamilyID = model.HeadOfFamilyID;

                foreach (var item in model.Members.Where(x => x.Selected))
                {
                    newFam.FamilyMemberAssociations.Add(new FamilyMemberAssociation()
                    {
                        Approved = true,
                        CreatedBy = LoggedInMemberId,
                        CreatedOn = DateTime.Now,
                        MemberId = item.MemberID
                    });
                }

                context.Families.Add(newFam);
                context.SaveChanges();

                return Ok(newFam.FamilyID);
            }
        }
    }
}

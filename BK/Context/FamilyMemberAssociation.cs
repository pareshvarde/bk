//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BK.Context
{
    using System;
    using System.Collections.Generic;
    
    public partial class FamilyMemberAssociation
    {
        public int FamilyId { get; set; }
        public int MemberId { get; set; }
        public bool DefaultFamily { get; set; }
        public bool Approved { get; set; }
        public Nullable<int> RelatedId { get; set; }
        public Nullable<int> RelationTypeId { get; set; }
        public Nullable<System.DateTime> ApprovedOn { get; set; }
        public Nullable<int> ApprovedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
    
        public virtual Family Family { get; set; }
        public virtual Member Member { get; set; }
        public virtual Member Member1 { get; set; }
    }
}

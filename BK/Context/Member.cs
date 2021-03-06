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
    
    public partial class Member
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Member()
        {
            this.Families = new HashSet<Family>();
            this.FamilyMemberAssociations = new HashSet<FamilyMemberAssociation>();
            this.FamilyMemberAssociations1 = new HashSet<FamilyMemberAssociation>();
        }
    
        public int MemberID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NickName { get; set; }
        public bool Gender { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public string BirthPlace { get; set; }
        public bool Alive { get; set; }
        public Nullable<System.DateTime> DOD { get; set; }
        public string DeathPlace { get; set; }
        public Nullable<System.DateTime> Anniversary { get; set; }
        public string EducationLevel { get; set; }
        public string EducationField { get; set; }
        public int OccupationID { get; set; }
        public string CompanyName { get; set; }
        public string JobTitle { get; set; }
        public string EmailAddress { get; set; }
        public Nullable<long> AadhaarNumber { get; set; }
        public string InstagramHandle { get; set; }
        public string FacebookHandle { get; set; }
        public string TwitterHandle { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public Nullable<System.DateTime> LastLoginOn { get; set; }
        public Nullable<System.Guid> PasswordUID { get; set; }
        public bool Active { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public int MaritalStatusID { get; set; }
        public string ProfileText { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Family> Families { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FamilyMemberAssociation> FamilyMemberAssociations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FamilyMemberAssociation> FamilyMemberAssociations1 { get; set; }
        public virtual Matrimonial Matrimonial { get; set; }
    }
}

﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class bkContext : DbContext
    {
        public bkContext()
            : base("name=bkContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<announcement> announcements { get; set; }
        public virtual DbSet<@event> events { get; set; }
        public virtual DbSet<familymember> familymembers { get; set; }
        public virtual DbSet<lkcategory> lkcategories { get; set; }
        public virtual DbSet<lkeventtype> lkeventtypes { get; set; }
        public virtual DbSet<lkgotra> lkgotras { get; set; }
        public virtual DbSet<lknukh> lknukhs { get; set; }
        public virtual DbSet<lkrelationtype> lkrelationtypes { get; set; }
        public virtual DbSet<login> logins { get; set; }
        public virtual DbSet<matrimonialinterest> matrimonialinterests { get; set; }
        public virtual DbSet<matrimonial> matrimonials { get; set; }
        public virtual DbSet<family> families { get; set; }
    }
}

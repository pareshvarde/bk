using FluentValidation;
using FluentValidation.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    [Validator(typeof(MemberViewModelValidator))]
    public class MemberViewModel
    {
        [JsonProperty("memberId")]
        public int? MemberID { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("nickName")]
        public string NickName { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }

        [JsonProperty("aadhaarNumber")]
        public long? AadhaarNumber { get; set; }

        [JsonProperty("gender")]
        public string Gender { get; set; }

        [JsonProperty("dob")]
        public DateTime? DOB { get; set; }

        [JsonProperty("birthPlace")]
        public string BirthPlace { get; set; }

        [JsonProperty("alive")]
        public bool Alive { get; set; }

        [JsonProperty("dod")]
        public DateTime? DOD { get; set; }

        [JsonProperty("deathPlace")]
        public string DeathPlace { get; set; }

        [JsonProperty("married")]
        public bool Married { get; set; }

        [JsonProperty("anniversary")]
        public DateTime? Anniversary { get; set; }

        [JsonProperty("educationLevel")]
        public string EducationLevel { get; set; }

        [JsonProperty("educationField")]
        public string EducationField { get; set; }

        [JsonProperty("occupationId")]
        public int OccupationId { get; set; }

        [JsonProperty("companyName")]
        public string CompanyName { get; set; }

        [JsonProperty("jobTitle")]
        public string JobTitle { get; set; }

        [JsonProperty("instagramHandle")]
        public string InstagramHandle { get; set; }

        [JsonProperty("facebookHandle")]
        public string FacebookHandle { get; set; }

        [JsonProperty("twitterHandle")]
        public string TwitterHandle { get; set; }

        [JsonProperty("relationTypeId")]
        public int? RelationTypeId { get; set; }

        [JsonProperty("relatedMemberId")]
        public int? RelatedMemberId { get; set; }

        [JsonProperty("familyId")]
        public int? FamilyId { get; set; }

        [JsonProperty("defaultFamily")]
        public bool DefaultFamily { get; set; }
        
        [JsonProperty("photoUrl")]
        public string PhotoUrl { get; set; }

        [JsonProperty("canEdit")]
        public bool canEdit { get; set; }
    }

    public class MemberViewModelValidator : AbstractValidator<MemberViewModel>
    {
        public MemberViewModelValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("First Name cannot be blank");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Last Name cannot be blank");
            RuleFor(x => x.DOB).NotEmpty().WithMessage("Date Of Birth cannot be blank");
        }
    }
}
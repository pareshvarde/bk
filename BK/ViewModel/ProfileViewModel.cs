using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class ProfileViewModel
    {
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
        public string Alive { get; set; }
        [JsonProperty("dod")]
        public DateTime? DOD { get; set; }
        [JsonProperty("deathPlace")]
        public string DeathPlace { get; set; }
        [JsonProperty("educationLevel")]
        public string EducationLevel { get; set; }
        [JsonProperty("educationField")]
        public string EducationField { get; set; }
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
    }
}
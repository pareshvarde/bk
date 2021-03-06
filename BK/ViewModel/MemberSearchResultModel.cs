﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class MemberSearchResultModel
    {
        public MemberSearchResultModel()
        {
            this.Results = new List<MemberSearchResultItemModel>();
        }

        [JsonProperty("results")]
        public List<MemberSearchResultItemModel> Results;

        [JsonProperty("totalRecords")]
        public int TotalRecords;
    }

    public class MemberSearchResultItemModel
    {
        [JsonProperty("memberId")]
        public int MemberId { get; set; }

        [JsonProperty("familyId")]
        public int FamilyId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }        

        [JsonProperty("address1")]
        public string Address1 { get; set; }

        [JsonProperty("address2")]
        public string Address2 { get; set; }
        
        [JsonProperty("gender")]
        public bool Gender { get; set; }

        [JsonProperty("photoUrl")]
        public string PhotoUrl { get; set; }

        [JsonProperty("photo1Url")]
        public string Photo1Url { get; set; }

        [JsonProperty("photo2Url")]
        public string Photo2Url { get; set; }

        [JsonProperty("photo3Url")]
        public string Photo3Url { get; set; }

        [JsonProperty("dob")]
        public DateTime? DOB { get; set; }

        [JsonProperty("dod")]
        public DateTime? DOD { get; set; }

        [JsonProperty("alive")]
        public bool? Alive { get; set; }

        [JsonProperty("education")]
        public string Education { get; set; }

        [JsonProperty("occupationId")]
        public int? OccupationId { get; set; }

        [JsonProperty("monthlyIncome")]
        public int? MonthlyIncome { get; set; }
      
        [JsonProperty("age")]
        public int Age
        {
            get
            {
                if (!this.DOB.HasValue)
                    return 0;

                if (this.Alive != null && !this.Alive.Value && !this.DOD.HasValue)
                    return 0;

                int age = DateTime.Today.Year - DOB.Value.Year;

                if (this.Alive != null && !this.Alive.Value)
                    age = this.DOD.Value.Year - DOB.Value.Year;

                if (age > 0 && this.DOB.Value > DateTime.Today.AddYears(-age))
                    age--;

                return age;
            }
        }
    }
}


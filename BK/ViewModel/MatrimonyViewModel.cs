using FluentValidation;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class MatrimonyViewModel
    {
        [JsonProperty("memberId")]
        public int MemberId { get; set; }

        [JsonProperty("maternalNukhId")]
        public int MaternalNukhId { get; set; }

        [JsonProperty("birthTime")]
        public TimeSpan? BirthTime { get; set; }

        [JsonProperty("maritalStatusId")]
        public int MaritalStatusId { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("weight")]
        public int Weight { get; set; }

        [JsonProperty("bodyTypeId")]
        public int BodyTypeId { get; set; }

        [JsonProperty("complexionTypeId")]
        public int ComplexionTypeId { get; set; }

        [JsonProperty("mangal")]
        public string Mangal { get; set; }

        [JsonProperty("smoke")]
        public bool Smoke { get; set; }

        [JsonProperty("tobacco")]
        public bool Tobacco { get; set; }

        [JsonProperty("alcohol")]
        public bool Alcohol { get; set; }

        [JsonProperty("disability")]
        public bool Disability { get; set; }

        [JsonProperty("ownHome")]
        public bool OwnHome { get; set; }

        [JsonProperty("vegetarian")]
        public bool Vegetarian { get; set; }

        [JsonProperty("monthlyIncome")]
        public int MonthlyIncome { get; set; }

        [JsonProperty("language")]
        public string Language { get; set; }

        [JsonProperty("profileText")]
        public string ProfileText { get; set; }

        [JsonProperty("photoUrl")]
        public string PhotoUrl { get; set; }
    }

    public class MatrimonyViewOnlyModel{

        public MatrimonyViewOnlyModel()
        {
            this.MatrimonyModel = new MatrimonyViewModel();
            this.MemberModel = new MemberViewModel();
        }

        [JsonProperty("matrimonyModel")]
        public MatrimonyViewModel MatrimonyModel { get; set; }

        [JsonProperty("memberModel")]
        public MemberViewModel MemberModel { get; set; }
    }    
}
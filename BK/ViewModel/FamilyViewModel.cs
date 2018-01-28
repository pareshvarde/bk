using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class FamilyViewModel
    {
        public FamilyViewModel() {
            this.Members = new List<FamilyMemberViewModel>();
        }


        [JsonProperty("familyId")]
        public int FamilyID { get; set; }

        [JsonProperty("nukhId")]
        public int NukhID { get; set; }

        [JsonProperty("categoryId")]
        public int CategoryID { get; set; }

        [JsonProperty("hofId")]
        public int HeadOfFamilyID { get; set; }

        [JsonProperty("address1")]
        public string Address1 { get; set; }

        [JsonProperty("address2")]
        public string Address2 { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("postalcode")]
        public string PostalCode { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("members")]
        public List<FamilyMemberViewModel> Members { get; set; }
    }

    public class FamilyMemberViewModel
    {
        [JsonProperty("memberId")]
        public int MemberID { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("dob")]
        public DateTime? DOB { get; set; }

        [JsonProperty("married")]
        public bool Married { get; set; }
        
        [JsonProperty("relation")]
        public string Relation { get; set; }
    }
}
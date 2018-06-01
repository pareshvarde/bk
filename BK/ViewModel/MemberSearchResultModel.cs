using Newtonsoft.Json;
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

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("address1")]
        public string Address1 { get; set; }

        [JsonProperty("address2")]
        public string Adderess2 { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("gender")]
        public string Gender { get; set; }
    }
}


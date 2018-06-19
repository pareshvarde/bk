using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class MatrimonySearchResultModel
    {
        public MatrimonySearchResultModel()
        {
            this.Results = new List<MatrimonySearchResultItemModel>();
        }

        [JsonProperty("results")]
        public List<MatrimonySearchResultItemModel> Results;

        [JsonProperty("totalRecords")]
        public int TotalRecords;
    }

    public class MatrimonySearchResultItemModel
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
    }
}
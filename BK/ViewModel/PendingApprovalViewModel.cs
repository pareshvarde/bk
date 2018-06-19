using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class PendingApprovalViewModel
    {
        [JsonProperty("addedById")]
        public int AddedById;

        [JsonProperty("addedByFirstName")]
        public string AddedByFirstName;

        [JsonProperty("addedByLastName")]
        public string AddedByLastName;

        [JsonProperty("addedToId")]
        public int AddedToId;

        [JsonProperty("addedToFirstName")]
        public string AddedToFirstName;

        [JsonProperty("addedToLastName")]
        public string AddedToLastName;

        [JsonProperty("addedOn")]
        public DateTime? AddedOn;

        [JsonProperty("familyId")]
        public int FamilyId;
    }
}
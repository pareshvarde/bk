using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class PendingApprovalsViewModel
    {
        [JsonProperty("addedById")]
        public int AddedById { get; set; }

        [JsonProperty("addedByFirstName")]
        public string AddedByFirstName { get; set; }

        [JsonProperty("addedByLastName")]
        public string AddedByLastName { get; set; }

        [JsonProperty("addedToId")]
        public int AddedToId { get; set; }

        [JsonProperty("addedToFirstName")]
        public string AddedToFirstName { get; set; }

        [JsonProperty("addedToLastName")]
        public string AddedToLastName { get; set; }

        [JsonProperty("addedOn")]
        public DateTime AddedOn { get; set; }

        [JsonProperty("familyId")]
        public int FamilyId { get; set; }
    }
}
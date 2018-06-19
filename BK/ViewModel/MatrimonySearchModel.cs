using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class MatrimonySearchModel
    {
        [JsonProperty("nukhId")]
        public int? NukhID { get; set; }

        [JsonProperty("categoryId")]
        public int? CategoryID { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("district")]
        public string District { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("gender")]
        public bool? Gender { get; set; }

        [JsonProperty("occupationId")]
        public int? OccupationId { get; set; }

        [JsonProperty("maritalStatusId")]
        public int? MaritalStatusId { get; set; }

        [JsonProperty("minimumAge")]
        public int? MinimumAge { get; set; }

        [JsonProperty("maximumAge")]
        public int? MaximumAge { get; set; }

        [JsonProperty("currentPage")]
        public int? CurrentPage { get; set; }

        [JsonProperty("pageSize")]
        public int? PageSize { get; set; }
    }
}
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class MemberBasicSearchModel
    {
        [JsonProperty("memberId")]
        public int? MemberID { get; set; }

        [JsonProperty("emailAddress")]
        public string EmailAddress { get; set; }

        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }

        [JsonProperty("aadhaarNumber")]
        public long? AadhaarNumber { get; set; }
    }
}
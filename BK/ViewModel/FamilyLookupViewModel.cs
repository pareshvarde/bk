using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class FamilyLookupViewModel
    {
        [JsonProperty("familyId")]
        public int FamilyID { get; set; }
        
        [JsonProperty("hof")]
        public string HeadOfFamily { get; set; }    
    }
}
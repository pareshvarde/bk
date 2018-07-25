using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace BK
{
    public class MemberWrapper
    {
        public static string ProfilePhoto(int memberId, bool gender, DateTime? modifiedOn)
        {
            if (!modifiedOn.HasValue)
                modifiedOn = DateTime.Now;

            string filePath = System.Web.Hosting.HostingEnvironment.MapPath(string.Format(@"~/Images/Profiles/{0}.jpg", memberId));
            if (File.Exists(filePath))
                return string.Format("images/profiles/{0}.jpg?{1}", memberId, modifiedOn.Value.Ticks);

            if (gender)
                return "images/profiles/male.png";
            else
                return "images/profiles/female.png";            
        }

        public static string MatrimonyPhoto(int memberId, bool gender, int photoNumber, DateTime? modifiedOn)
        {
            if (!modifiedOn.HasValue)
                modifiedOn = DateTime.Now;

            string filePath = System.Web.Hosting.HostingEnvironment.MapPath(string.Format(@"~/Images/Matrimonials/{0}_{1}.jpg", memberId, photoNumber));
            if (File.Exists(filePath))
                return string.Format("images/Matrimonials/{0}_{1}.jpg?{2}", memberId, photoNumber, modifiedOn.Value.Ticks);

            if (gender)
                return "images/profiles/male.png";
            else
                return "images/profiles/female.png";
        }
    }
}
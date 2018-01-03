using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace BK.Utility
{
    public class IDGenerator
    {
        public static string CreateSID(string prefix)
        {
            //set allowed characters and length of the unique key
            char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
            int maxLength = 12;

            byte[] data = new byte[maxLength];
            RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider();
            crypto.GetNonZeroBytes(data);

            StringBuilder result = new StringBuilder(prefix, maxLength);

            foreach (byte b in data)
                result.Append(chars[b % (chars.Length - 1)]);

            return ConvertToLong(result.ToString());
        }

        //convert a 15 Character "Case-Sensitive" SFDC Id in to an 18 Character Case-Insensitive Id
        public static String ConvertToLong(string inID)
        {
            if (string.IsNullOrWhiteSpace(inID))
                return string.Empty;

            if (inID.Length == 18)
            {
                return inID;
            }
            else if (inID.Length != 15)
            {
                return "";
            }
            else
            {
                String suffix = "";
                for (int i = 0; i < 3; i++)
                {
                    int flags = 0;
                    for (int j = 0; j < 5; j++)
                    {
                        string s = inID.Substring(i * 5 + j, 1);
                        if (IsUpper(s))
                        {
                            flags += 1 << j;
                        }
                    }
                    suffix = suffix + "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345".Substring(flags, 1);
                }
                return inID + suffix;
            }

        }

        private static bool IsUpper(string value)
        {
            // Consider string to be uppercase if it has no lowercase letters.
            for (int i = 0; i < value.Length; i++)
            {
                if (char.IsLower(value[i]) || char.IsNumber(value[i]))
                {
                    return false;
                }
            }
            return true;
        }

        public static bool AreEqual(string id1, string id2)
        {
            if (string.IsNullOrWhiteSpace(id1))
                id1 = string.Empty;

            if (string.IsNullOrWhiteSpace(id2))
                id2 = string.Empty;

            if (id1.Length == 15)
                id1 = ConvertToLong(id1);

            if (id2.Length == 15)
                id2 = ConvertToLong(id2);

            return id1 == id2;
        }

        public class Prefixes
        {
            public const string FAMILY = "FAM";         
        }
    }
}
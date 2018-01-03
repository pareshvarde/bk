using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Security.Claims;
using BK.Context;

namespace BK
{
    public class bkAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            familymember fMember = null;

            using (bkContext _context = new bkContext())
            {
                fMember = _context.familymembers.FirstOrDefault(m => m.EmailAddress == context.UserName);
                if (fMember == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                login fLogin = _context.logins.FirstOrDefault(l => l.Password == context.Password && l.Active == true);
                fLogin.LastLoginOn = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                if (fLogin == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role", "user"));
            identity.AddClaim(new Claim("familyId", fMember.FamilyID.ToString()));
            identity.AddClaim(new Claim("familyMemberId", fMember.FamilyMemberID.ToString()));

            context.Validated(identity);
        }
    }
}
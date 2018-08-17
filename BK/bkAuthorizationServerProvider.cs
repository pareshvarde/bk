using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Security.Claims;
using BK.Context;
using Microsoft.Owin.Security;

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
            Member member = null;
            bool isAdmin = false;      

            using (bkContext _context = new bkContext())
            {
                member = _context.Members.FirstOrDefault(m => m.EmailAddress == context.UserName);

                if (member != null)
                {
                    if (!member.Password.Equals(context.Password, StringComparison.Ordinal))
                        member = null;
                }

                if (member == null && context.UserName == "admin@varde.com" && context.Password.Equals("L4ndm4rk^%9", StringComparison.Ordinal))
                    isAdmin = true;                

                if (member == null && !isAdmin)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                if (!isAdmin)
                {
                    member.LastLoginOn = DateTime.Now;
                    await _context.SaveChangesAsync();
                }
            }

            var identity = GetIdentity(member, isAdmin);
            var ticket = new AuthenticationTicket(identity, null);

            context.Validated(ticket);
        }

        private ClaimsIdentity GetIdentity(Member member, bool isAdmin)
        {
            var identity = new ClaimsIdentity("JWT");

            identity.AddClaim(new Claim("role", "user"));

            if (member != null)
            {
                identity.AddClaim(new Claim("memberId", member.MemberID.ToString(), ClaimValueTypes.Integer));
                identity.AddClaim(new Claim("name", member.FirstName));
                identity.AddClaim(new Claim("fullname", string.Format("{0} {1}", member.FirstName, member.LastName)));
            }
            else if (isAdmin)
            {
                identity.AddClaim(new Claim("memberId", "0", ClaimValueTypes.Integer));
                identity.AddClaim(new Claim("name", "Administrator"));
                identity.AddClaim(new Claim("fullname", "System Administrator"));
            }
            else
            {
                return null;
            }            

            return identity;
        }
    }
}
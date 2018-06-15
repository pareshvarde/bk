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
            Member fMember = null;            

            using (bkContext _context = new bkContext())
            {
                fMember = _context.Members.FirstOrDefault(m => m.EmailAddress == context.UserName && m.Password == context.Password);
                if (fMember == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }                
                                                
                fMember.LastLoginOn = DateTime.UtcNow;
                await _context.SaveChangesAsync();               
            }


            var identity = new ClaimsIdentity("JWT");            
            identity.AddClaim(new Claim("role", "user"));            
            identity.AddClaim(new Claim("memberId", fMember.MemberID.ToString(), ClaimValueTypes.Integer));
            identity.AddClaim(new Claim("name", fMember.FirstName));
            identity.AddClaim(new Claim("fullname", string.Format("{0} {1}", fMember.FirstName, fMember.LastName)));

            var ticket = new AuthenticationTicket(identity, null);

            context.Validated(ticket);
        }
    }
}
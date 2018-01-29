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
                fMember = _context.Members.FirstOrDefault(m => m.EmailAddress == context.UserName && m.Password == context.Password && m.Active);
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
            identity.AddClaim(new Claim("memberid", fMember.MemberID.ToString()));

            var ticket = new AuthenticationTicket(identity, null);

            context.Validated(ticket);
        }
    }
}
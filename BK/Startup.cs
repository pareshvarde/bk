using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.OAuth;
using System.Configuration;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;

[assembly: OwinStartup(typeof(BK.Startup))]
namespace BK
{    
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            ConfigureOAuth(app);
            ConfigureOAuthTokenConsumption(app);
            WebApiConfig.Register(config);  
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/login"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(30),
                Provider = new bkAuthorizationServerProvider(),
                AccessTokenFormat = new bkTokenFormat("http://brahmkshatriya.net.in")
            };

            app.UseOAuthAuthorizationServer(OAuthServerOptions);                        
        }

        private void ConfigureOAuthTokenConsumption(IAppBuilder app)
        {
            var issuer = "http://brahmkshatriya.net.in";
            string audienceId = ConfigurationManager.AppSettings["as:AudienceId"];
            byte[] audienceSecret = TextEncodings.Base64Url.Decode
            (ConfigurationManager.AppSettings["as:AudienceSecret"]);
                        
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { audienceId },
                    IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                    {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, audienceSecret)
                    }
                });
        }
    }
}
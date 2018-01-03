using FluentValidation;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class Register
    {
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("emailAddress")]
        public string EmailAddress { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("male")]
        public bool Male { get; set; }
    }

    public class RegisterValidator : AbstractValidator<Register>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().NotNull().WithMessage("First Name cannot be blank");
            RuleFor(x => x.LastName).NotEmpty().NotNull().WithMessage("Last Name cannot be blank");
            RuleFor(x => x.EmailAddress).NotEmpty().NotNull().WithMessage("Email address cannot be blank").EmailAddress().WithMessage("Invalid email address");
            RuleFor(x => x.Password).NotNull().NotEmpty().WithMessage("Password cannot be blank");
        }
    }
}
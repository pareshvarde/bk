using FluentValidation;
using FluentValidation.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    [Validator(typeof(RegisterValidatorViewModel))]
    public class RegisterViewModel
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

    public class RegisterValidatorViewModel : AbstractValidator<RegisterViewModel>
    {
        public RegisterValidatorViewModel()
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("First Name cannot be blank");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Last Name cannot be blank");
            RuleFor(x => x.EmailAddress).NotEmpty().WithMessage("Email address cannot be blank").EmailAddress().WithMessage("Invalid email address");
            RuleFor(x => x.Password).NotNull().WithMessage("Password cannot be blank");
        }
    }
}
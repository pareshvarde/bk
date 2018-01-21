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
        [JsonProperty("email")]
        public string EmailAddress { get; set; }
        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }
        [JsonProperty("aadhaarNumber")]
        public long? AadhaarNumber { get; set; }
        [JsonProperty("gender")]
        public bool Gender { get; set; }
        [JsonProperty("dob")]
        public DateTime? DateOfBirth { get; set; }
        [JsonProperty("address1")]
        public string Address1 { get; set; }
        [JsonProperty("address2")]
        public string Address2 { get; set; }
        [JsonProperty("city")]
        public string City { get; set; }
        [JsonProperty("state")]
        public string State { get; set; }
        [JsonProperty("country")]
        public string Country { get; set; }

    }

    public class RegisterValidatorViewModel : AbstractValidator<RegisterViewModel>
    {
        public RegisterValidatorViewModel()
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("First Name cannot be blank");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Last Name cannot be blank");
            RuleFor(x => x.EmailAddress).NotEmpty().WithMessage("Email address cannot be blank").EmailAddress().WithMessage("Invalid email address");
            RuleFor(x => x.City).NotEmpty().WithMessage("City cannot be blank");
            RuleFor(x => x.State).NotEmpty().WithMessage("State cannot be blank");
            RuleFor(x => x.Country).NotEmpty().WithMessage("Country cannot be blank");
            RuleFor(x => x.DateOfBirth).NotEmpty().WithMessage("Date Of Birth cannot be blank");
        }
    }
}
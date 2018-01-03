using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    public class Register
    {        
        public string FirstName { get; set; }        
        public string LastName { get; set; }        
        public string EmailAddress { get; set; }        
        public string Password { get; set; }
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
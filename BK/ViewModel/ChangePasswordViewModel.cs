using FluentValidation;
using FluentValidation.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.ViewModel
{
    [Validator(typeof(ChangePasswordValidatorViewModel))]
    public class ChangePasswordViewModel
    {
        [JsonProperty("currentPassword")]
        public string CurrentPassword { get; set; }
        [JsonProperty("newPassword")]
        public string NewPassword { get; set; }
    }

    public class ChangePasswordValidatorViewModel : AbstractValidator<ChangePasswordViewModel>
    {
        public ChangePasswordValidatorViewModel()
        {
            RuleFor(x => x.CurrentPassword).NotEmpty().WithMessage("Current Password cannot be blank");
            RuleFor(x => x.NewPassword).NotEmpty().WithMessage("New Password cannot be blank");            
        }
    }
}
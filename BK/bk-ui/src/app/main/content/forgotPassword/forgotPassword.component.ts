import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector   : 'app-forgot-password',
    templateUrl: 'forgotPassword.component.html',
    styleUrls  : ['forgotPassword.component.scss'],    
    providers: [bkDataService]
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    forgotPasswordFormErrors: any;

    constructor(private formBuilder: FormBuilder)
    {
        this.forgotPasswordFormErrors = {
            email: {}
        };
    }

    ngOnInit()
    {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.forgotPasswordForm.valueChanges.subscribe(() => {
            this.onForgotPasswordFormValuesChanged();
        });
    }

    onForgotPasswordFormValuesChanged()
    {
        for ( const field in this.forgotPasswordFormErrors )
        {
            if ( !this.forgotPasswordFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.forgotPasswordFormErrors[field] = {};

            // Get the control
            const control = this.forgotPasswordFormErrors.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.forgotPasswordFormErrors[field] = control.errors;
            }
        }
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ReplaySubject } from 'rxjs';

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgotPassword.component.html',
    styleUrls: ['forgotPassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    forgotPasswordForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private dataService: bkDataService, private alertService: NotificationsService) {

    }

    ngOnInit() {

        this.forgotPasswordForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email])
        });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    processForgotPassword() {
        if (this.forgotPasswordForm.invalid)
            return;

        let emailValue = this.forgotPasswordForm.controls.email.value;
        this.dataService.sendResetPasswordEmail(emailValue).takeUntil(this.destroyed$).subscribe(
            (res) => {
                this.alertService.success("Please check your inbox for password reset link");
            },
            (err) => {
                if (err.errors)
                    this.alertService.error('', err.errors[0]);
                else
                    this.alertService.error('', err);
            }
        );
    }
}

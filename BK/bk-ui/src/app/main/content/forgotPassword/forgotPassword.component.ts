import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { ReplaySubject } from 'rxjs';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { GlobalService } from '../../services/global-service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgotPassword.component.html',
    styleUrls: ['forgotPassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    forgotPasswordForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private dataService: bkDataService, 
        private notificationService: NotificationsService, private confirmationService: ConfirmationService, 
        private globalService: GlobalService) {
    }

    ngOnInit() {

        this.forgotPasswordForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)])
        });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    processForgotPassword() {
        if (this.forgotPasswordForm.invalid) {
            var el = <HTMLElement>document.querySelector("input.ng-invalid");
            if (el)
                el.focus();
            return;
        }

        let emailValue = this.forgotPasswordForm.controls.email.value;
        this.dataService.sendResetPasswordEmail(emailValue).takeUntil(this.destroyed$).subscribe(
            (res) => {
                this.notificationService.success("Please check your inbox for password reset link");
            },
            (err) => {
                if (err.errors)
                    this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
                else
                    this.confirmationService.create("Error", err, this.globalService.alertOptions);
            }
        );
    }
}

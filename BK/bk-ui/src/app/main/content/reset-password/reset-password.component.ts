import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { NotificationsService } from 'angular2-notifications';
import { PasswordValidators } from 'ng2-validators'
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  resetPasswordForm: FormGroup;  
  resetToken: string

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService, private alertService: NotificationsService) {    
    this.route.params.subscribe(params => this.resetToken = params.token);
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)      
    },PasswordValidators.mismatchedPasswords('newPassword','confirmPassword'));  
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid)
    {      
      var el = <HTMLElement> document.querySelector("input.ng-invalid");
      if (el)      
        el.focus();      
      return;
    }
      
    let password = this.resetPasswordForm.controls.newPassword.value;    
    this.resetPasswordForm.reset();
    (<HTMLElement>document.querySelector('input[formControlName=newPassword]')).focus();   
    
    this.dataService.resetPassword(password, this.resetToken).takeUntil(this.destroyed$).subscribe(
      (res) => {
          this.alertService.success("Password has been reset, Please login with your new password now.");
          this.router.navigate(['login']);
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { NotificationsService } from 'angular2-notifications';
import { PasswordValidators } from 'ng2-validators'
import  'rxjs/add/operator/takeUntil'
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']  
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  
  changePasswordForm: FormGroup;
  formModel: changePasswordViewModel;

  constructor(private dataService: bkDataService, private alertService: NotificationsService) {
    this.formModel = new changePasswordViewModel();
  }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    },PasswordValidators.mismatchedPasswords('newPassword','confirmPassword'));
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete(); 
  }

  changePassword() {

    if (this.changePasswordForm.invalid)
      return;

    (<HTMLElement>document.querySelector('input[formControlName=currentPassword]')).focus();

    const tFormModel = (JSON.parse(JSON.stringify(this.formModel)));
    this.changePasswordForm.reset();    

    this.dataService.changePassword(tFormModel).takeUntil(this.destroyed$).subscribe(
      (res) => {      
        this.alertService.success("Your password has been changed.");
      },
      (err) => {        
        if (err.errors)
          this.alertService.error('',err.errors[0]);
        else
          this.alertService.error('',err);
      }
    );
  }
}

export class changePasswordViewModel {
  currentPassword: string;
  newPassword: string;
}

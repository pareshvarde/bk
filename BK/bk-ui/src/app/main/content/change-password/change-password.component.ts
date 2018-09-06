import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { PasswordValidators } from 'ng2-validators'
import { ReplaySubject } from 'rxjs';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { GlobalService } from '../../services/global-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']  
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  
  changePasswordForm: FormGroup;
  formModel: changePasswordViewModel;

  constructor(private dataService: bkDataService, private notificationService: NotificationsService, 
      private confirmationService: ConfirmationService, private globalService: GlobalService,
      private router: Router, private location: Location) {
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
    {      
      var el = <HTMLElement> document.querySelector("input.ng-invalid");
      if (el)      
        el.focus();      
      return;
    }


    (<HTMLElement>document.querySelector('input[formControlName=currentPassword]')).focus();

    const tFormModel = (JSON.parse(JSON.stringify(this.formModel)));
    this.changePasswordForm.reset();    

    this.dataService.changePassword(tFormModel).pipe(takeUntil(this.destroyed$)).subscribe(
      (res) => {              
        this.notificationService.success("Your password has been changed.");
        this.back();
      },
      (err) => {        
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);          
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);                    
      }
    );
  }

  back() {

    if (window.history.length > 1)
      this.location.back();
    else
      this.router.navigate(['home']);
  }
}

export class changePasswordViewModel {
  currentPassword: string;
  newPassword: string;
}

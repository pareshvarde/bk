import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [bkDataService]
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  formModel: changePasswordViewModel;

  constructor(private formBuilder: FormBuilder, private dataService: bkDataService, private alertService: NotificationsService) {
    this.formModel = new changePasswordViewModel();
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  changePassword() {  
    this.dataService.changePassword(this.formModel).subscribe(
      (res) => {    
        this.changePasswordForm.reset();    
        this.alertService.success("Your password has been changed.");
      },
      (err) => {    
        this.changePasswordForm.reset();  
        
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }
}

export class changePasswordViewModel {
  currentPassword: string;
  newPassword: string;
}

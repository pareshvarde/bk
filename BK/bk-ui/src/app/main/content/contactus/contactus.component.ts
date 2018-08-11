import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '../../../../../node_modules/@angular/forms';
import { UniversalValidators } from '../../../../../node_modules/ng2-validators';
import { Router } from '../../../../../node_modules/@angular/router';
import { Location, formatDate } from '@angular/common';
import { bkDataService } from '../../services/bk-data.service';
import { ConfirmationService } from '../../../../../node_modules/@jaspero/ng-confirmations';
import { GlobalService } from '../../services/global-service';
import { ReplaySubject } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit, OnDestroy {

  contactusForm: FormGroup;
  attachment: any;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  
  constructor(private router: Router, private location: Location, public globalService: GlobalService,
    private dataService: bkDataService, private confirmationService: ConfirmationService) 
  {

  }

  ngOnInit() {
    this.contactusForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, UniversalValidators.isNumber]),
      subject: new FormControl('', [Validators.required]),
      attachment: new FormControl('', null),
      content: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });  
  }

  save(){   

    if (this.contactusForm.invalid) {
      var el = <HTMLElement>document.querySelector("input.ng-invalid");
      if (el)
        el.focus();
      return;
    }

    var formData: FormData = new FormData();
    formData.append('name',this.contactusForm.controls.name.value);
    formData.append('email',this.contactusForm.controls.email.value);
    formData.append('phone',this.contactusForm.controls.phone.value);
    formData.append('subject',this.contactusForm.controls.subject.value);
    formData.append('content',this.contactusForm.controls.content.value);
    formData.append('attachment',this.attachment);

    this.dataService.submitFeedback(formData).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.confirmationService.create("", "Your request has been sent to Administrators", this.globalService.alertOptions);
        this.router.navigate(['home']);
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  cancel(){
    if (window.history.length > 1)
      this.location.back();
    else
      this.router.navigate(['home']);
  }

  fileChangeEvent(event: any){
    
    if (event.srcElement.files.length === 0)  { 
      this.attachment = null;
      return;            
    }

    this.attachment = event.srcElement.files[0]
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

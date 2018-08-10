import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { UniversalValidators } from 'ng2-validators';
import { bkDataService } from '../../services/bk-data.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/registerModel';
import { CATEGORIES_DATA } from '../../data/categories';
import { NUKHS_LOOKUP_DATA } from '../../data/nukhsLookup';
import { ReplaySubject } from 'rxjs';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { GlobalService } from '../../services/global-service';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { TermsComponent } from '../terms/terms.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']  
})
export class RegisterComponent implements OnInit, AfterViewChecked, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  registerForm: FormGroup;
  formModel: RegisterModel;    
  captchaResponse: string;
  registerClicked: boolean = false;
  termsAccepted: boolean = false;

  readonly CATEGORIES_DATA_LOCAL = CATEGORIES_DATA;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  
  constructor(private router: Router, private dataService: bkDataService, public dialog: MatDialog,
    private cdr: ChangeDetectorRef, private confirmationService: ConfirmationService, private globalService: GlobalService) 
  {         
    this.formModel = new RegisterModel();    
  }
  
  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.registerForm = new FormGroup({      
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required, , Validators.maxLength(50)]),
      email: new FormControl('', [Validators.email,Validators.required, Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [UniversalValidators.noWhitespace, UniversalValidators.isNumber, Validators.required, Validators.maxLength(15)]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber, UniversalValidators.noWhitespace, Validators.maxLength(16)]),
      categoryId: new FormControl('', [Validators.required]),
      nukhId: new FormControl('', [Validators.required]),
      gender: new FormControl('M', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.maxLength(50)]),
      address2: new FormControl('', [Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      district: new FormControl('', [Validators.maxLength(50)]),
      postalCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(50)]),      
      country: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      terms: new FormControl('', null)
    }); 
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  showTerms(){
    let dialogRef = this.dialog.open(TermsComponent, {
      width: '800px',
      height: '90vh'
    });
  }

  processRegistration(){

    if (!this.termsAccepted){
      this.confirmationService.create("Error", "Please read and agree to terms and condition.", this.globalService.alertOptions);          
      return;
    }

    this.registerClicked = true;

    if (!this.captchaResponse)
      return;

    if (this.registerForm.invalid)
    {      
      var el = <HTMLElement> document.querySelector("input.ng-invalid");
      if (el)      
        el.focus();      
      return;
    }    
    
    this.formModel.captchaResponse = this.captchaResponse;
    this.formModel.dob.setMinutes(this.formModel.dob.getMinutes() - this.formModel.dob.getTimezoneOffset())

    this.dataService.register(this.formModel).takeUntil(this.destroyed$).subscribe(
       (res) => {              
          this.confirmationService.create("Error", "Your registration completed successfully. Please check your email for your username and password.", this.globalService.alertOptions);         
          this.router.navigate(['login']);
       },
       (err) => {         
         if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
         else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
       }
     );
  }

  handleCorrectCaptcha(event: any){    
    this.captchaResponse = event;
  }
}

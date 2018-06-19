import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { EmailValidators, UniversalValidators } from 'ng2-validators';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/registerModel';
import { CATEGORIES_DATA } from '../../data/categories';
import { NUKHS_LOOKUP_DATA } from '../../data/nukhsLookup';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']  
})
export class RegisterComponent implements OnInit, AfterViewChecked, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  registerForm: FormGroup;
  formModel: RegisterModel;    
  readonly CATEGORIES_DATA_LOCAL = CATEGORIES_DATA;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  
  constructor(private router: Router, private dataService: bkDataService, 
    private alertService: NotificationsService, private cdr: ChangeDetectorRef) 
  {         
    this.formModel = new RegisterModel();    
  }
  
  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.registerForm = new FormGroup({      
      firstName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required, Validators.maxLength(50)]),
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
    }); 
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  processRegistration(){
    if (this.registerForm.invalid)
    {      
      var el = <HTMLElement> document.querySelector("input.ng-invalid");
      if (el)      
        el.focus();      
      return;
    }

    this.formModel.dob.setMinutes(this.formModel.dob.getMinutes() - this.formModel.dob.getTimezoneOffset())

    this.dataService.register(this.formModel).takeUntil(this.destroyed$).subscribe(
      (res) => {      
        this.alertService.success("Your registration completed successfully. Please check your email for your username and password.");
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

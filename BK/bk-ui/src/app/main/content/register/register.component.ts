import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { EmailValidators, UniversalValidators } from 'ng2-validators';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [bkDataService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;  
  formModel: registerViewModel;
  
  constructor(private dataService: bkDataService, private alertService: NotificationsService) { 
    this.formModel = new registerViewModel();   
  }

  ngOnInit() {
    this.registerForm = new FormGroup({      
      firstName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required]),
      lastName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required]),
      email: new FormControl('', [EmailValidators.normal,Validators.required]),
      phoneNumber: new FormControl('', [UniversalValidators.noWhitespace, UniversalValidators.isNumber, Validators.required]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber]),
      categoryId: new FormControl(1, [Validators.required]),
      gender: new FormControl('', null),
      dob: new FormControl('', [Validators.required]),
      address1: new FormControl('', null),
      address2: new FormControl('', null),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    }); 
  }

  processRegistration(){
    
    const tFormModel = (JSON.parse(JSON.stringify(this.formModel)));    

    this.dataService.register(tFormModel).subscribe(
      (res) => {      
        this.alertService.success("Your registration completed successfully. Please check your email for your usename and password.");
      },
      (err) => {        
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }
}

export class registerViewModel{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  aadhaarNumber: number;
  gender: boolean;
  dob: Date;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { EmailValidators, UniversalValidators } from 'ng2-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;  
  formModel: RegisterViewModel;
  
  constructor() { 
    this.formModel = new RegisterViewModel();
  }

  ngOnInit() {
    this.registerForm = new FormGroup({      
      firstName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required]),
      lastName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required]),
      email: new FormControl('', [EmailValidators.normal,Validators.required]),
      phoneNumber: new FormControl('', [UniversalValidators.isNumber]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber]),
      gender: new FormControl(1, null),
      dob: new FormControl('', [Validators.required]),
      address1: new FormControl('', null),
      address2: new FormControl('', null),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('India', [Validators.required]),
    }); 
  }

  processRegistration(){

  }
}

export class RegisterViewModel{
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

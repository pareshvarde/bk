import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;  
  
  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({      
      firstName: new FormControl('', null),
      lastName: new FormControl('', null),
      email: new FormControl('', null),
      phoneNumber: new FormControl('', null),
      aadhaarNumber: new FormControl('', null),
      gender: new FormControl('', null),
      dob: new FormControl('', null),
      address1: new FormControl('', null),
      address2: new FormControl('', null),
      city: new FormControl('', null),
      state: new FormControl('', null),
      country: new FormControl('', null),
    }); 
  }

}

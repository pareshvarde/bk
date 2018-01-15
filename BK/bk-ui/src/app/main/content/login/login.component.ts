import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [bkDataService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormErrors: any;  

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: bkDataService) { 
    this.loginFormErrors = {
      email   : {},
      password: {}
  };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false, null)
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  processLogin(){
    let localStorage = window.localStorage;
    localStorage.removeItem('token');

    this.dataService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      (res) =>{      
        let result = JSON.parse((<any>res)._body)        
        localStorage.setItem('token', result.access_token);
        this.router.navigate(['home']);
      },
      (err) =>{        
        let error = JSON.parse((<any>err)._body)
        console.log(err);
      }
    );    
  }
}
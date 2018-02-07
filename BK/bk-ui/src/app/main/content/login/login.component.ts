import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;  

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService) 
  { 
   
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false, null)
    }); 
  }

  processLogin(){
    let localStorage = window.localStorage;
    localStorage.removeItem('token');

    let emailValue = this.loginForm.controls.email.value;
    let passwordValue = this.loginForm.controls.password.value;

    this.loginForm.reset();
    (<HTMLElement>document.querySelector('input[formControlName=email]')).focus();
    
    this.dataService.login(emailValue, passwordValue).subscribe(
      (res) =>{              
        let result = JSON.parse((<any>res)._body)        
        localStorage.setItem('token', result.access_token);
        this.router.navigate(['home']);
      },
      (err) =>{                  
        if (err.message)           
        {
          this.alertService.error('Login Failed', err.message);        
          return;
        }
              
        this.alertService.error('Login Failed', err.error_description);        
      }
    );    
  }
}
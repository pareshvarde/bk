import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { NotificationsService } from 'angular2-notifications';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  loginForm: FormGroup;  

  constructor(private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService) 
  { 
   
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false, null)
    }); 
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  processLogin(){
    if (this.loginForm.invalid)
    {      
      var el = <HTMLElement> document.querySelector("input.ng-invalid");
      if (el)      
        el.focus();      
      return;
    }
      
    let localStorage = window.localStorage;
    localStorage.removeItem('token');

    let emailValue = this.loginForm.controls.email.value;
    let passwordValue = this.loginForm.controls.password.value;

    this.loginForm.reset();
    (<HTMLElement>document.querySelector('input[formControlName=email]')).focus();
    
    this.dataService.login(emailValue, passwordValue).takeUntil(this.destroyed$).subscribe(
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
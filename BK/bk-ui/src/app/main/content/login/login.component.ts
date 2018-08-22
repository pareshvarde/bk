import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { bkAuthService } from '../../services/auth-service';
import { GlobalService } from '../../services/global-service';
import { ConfirmationService } from '@jaspero/ng-confirmations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  loginForm: FormGroup;  
  returnUrl:string;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: bkDataService, private globalService: GlobalService,
    private confirmationService: ConfirmationService,  private authService: bkAuthService) 
  { 
   
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false, null)
    });       
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
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
          
    localStorage.removeItem('token');    

    let emailValue = this.loginForm.controls.email.value;
    let passwordValue = this.loginForm.controls.password.value;    
    let remember = this.loginForm.controls.rememberMe.value;
    
    this.dataService.login(emailValue, passwordValue).takeUntil(this.destroyed$).subscribe(
      (res) =>{              
        let result = JSON.parse((<any>res)._body)        
        localStorage.setItem('token', result.access_token);        

        this.globalService.setAvatarUrl();
        
        if (this.returnUrl)
          this.router.navigate([this.returnUrl]);
        else
          this.loadFamily();
      },
      (err) =>{                  
        this.loginForm.reset();
        (<HTMLElement>document.querySelector('input[formControlName=email]')).focus();

        if (err.message)                   
          this.confirmationService.create("Login Failed", err.message, this.globalService.alertOptions);
        else              
          this.confirmationService.create('Login Failed', err.error_description, this.globalService.alertOptions);
      }
    );    
  }

  loadFamily(){
    this.dataService.getDefaultFamily(this.authService.memberId()).takeUntil(this.destroyed$).subscribe(
      (res) => {        
        this.router.navigate(['family', res.result])
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create('', err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create('', err, this.globalService.alertOptions);
      }
    );
  }
}
import { Injectable } from '@angular/core';
import { Http, Response, Headers  } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { error } from 'selenium-webdriver';
import { changePasswordViewModel } from '../content/change-password/change-password.component';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Injectable()
export class bkDataService {
  private API_URL = "http://localhost:60067/api/";
  @BlockUI() blockUI: NgBlockUI;

  constructor(private http: Http) { }

  login(userName: string, password: string): Observable<any> {
    debugger;
    this.blockUI.start("Please wait...");

    return this.http.post(this.API_URL + "login", "username=" + userName + "&password=" + password + "&grant_type=password").map(response => {
      debugger;
      this.blockUI.stop();
      return response;
    }).catch((error: any) => this.handleAPIError(error));      
  };

  sendResetPasswordEmail(emailAddress: string) {

    return this.http.get(this.API_URL + "sendResetPasswordEmail?emailAddress=" + emailAddress).map((res) => {
      return this.handleAPIResponse(res);
    }).catch((error: any) => this.handleAPIError(error));
  };

  resetPassword(password: string, token: string)
  {
    return this.http.get(this.API_URL + "resetPassword?password=" + password + "&token=" + token).map((res)=>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  changePassword(model: changePasswordViewModel)
  {        
    return this.http.post(this.API_URL + "changePassword", model,{headers: this.getHeader()}).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  private getHeader(): Headers{    
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      }
    );

    return headers;
  }

  private handleAPIResponse(response: any) {    
    return JSON.parse(response._body);
  }

  private handleAPIError(error: HttpErrorResponse): any {         
    if (error.message)    
      return Observable.throw(error.message);
    else
      return Observable.throw(JSON.parse((<any>error)._body))
  };
}

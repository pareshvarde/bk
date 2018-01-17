import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class bkDataService {
  private API_URL = "http://localhost:60067/api/";

  constructor(private http: Http) { }

  login(userName: string, password: string): Observable<any> {
    return this.http.post(this.API_URL + "login", "username=" + userName + "&password=" + password + "&grant_type=password").map(response => {
      return response;
    },
      (err: HttpErrorResponse) => {
        return err;
      }
    );
  };

  sendResetPasswordEmail(emailAddress: string) {
    return this.http.get(this.API_URL + "sendResetPasswordEmail?emailAddress=" + emailAddress).map((res) => {
      return this.handleAPIResponse(res);
    }).catch((error: any) => this.handleAPIError(error));
  };

  private handleAPIResponse(response: any) {
    return JSON.parse(response._body);
  }

  private handleAPIError(error: any): any {
    if (error.message)
      return Observable.throw(error.message);
    else
      return Observable.throw(JSON.parse((<any>error)._body))
  };
}

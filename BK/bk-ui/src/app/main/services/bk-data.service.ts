import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class bkDataService {
  private API_URL = "http://localhost:60067/api/";

  constructor(private http: Http) { }

  login(userName: string, password: string): any {
    this.http.post(this.API_URL + "login", "username=" + userName + "&password=" + password + "&grant_type=password").subscribe(response => {

      debugger;

      let result = JSON.parse(response._body);

      if (response.status === 200) {
        let localStorage = window.localStorage;
        localStorage.setItem('token', result.access_token);
      }
      else {

      }
    },
    (err: HttpErrorResponse) =>{
      debugger;      
      let error = JSON.parse(err._body).error_description;
    }
  );
  };
}

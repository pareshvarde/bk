import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Observable } from 'rxjs/Observable';

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
}

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class bkAuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor() { }

  authenticated() : boolean{
    return tokenNotExpired();
  }

  memberId() : number{    
    var token = localStorage.getItem('token');
    if (!token)
      return null;  
    var tokenDetail = this.jwtHelper.decodeToken(token);
    return tokenDetail.memberId;    
  }

  name() : string{    
    var token = localStorage.getItem('token');
    var tokenDetail = this.jwtHelper.decodeToken(token);
    return tokenDetail.name;    
  }
}

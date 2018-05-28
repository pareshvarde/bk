import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt"

@Injectable()
export class bkAuthService {

  constructor() { }
  jwtHelper: JwtHelperService = new JwtHelperService();
  
  authenticated(): boolean {
    var token = localStorage.getItem('token');

    if (!token)
      return null;
      
    return !this.jwtHelper.isTokenExpired(token);    
  }

  memberId(): number {
    var token = localStorage.getItem('token');

    if (!token)
      return null;

    var tokenDetail = this.jwtHelper.decodeToken(token);
    return tokenDetail.memberId;
  }

  name(): string {
    var token = localStorage.getItem('token');
    
    if (!token)
      return null;

    var tokenDetail = this.jwtHelper.decodeToken(token);
    return tokenDetail.name;
  }
}

import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt"
import { Router } from '@angular/router';

@Injectable()
export class bkAuthService {

  constructor(private router: Router) { }
  jwtHelper: JwtHelperService = new JwtHelperService();
  
  authenticated(): boolean {
    var token = localStorage.getItem('token');

    if (!token)
      return null;
      
    return !this.jwtHelper.isTokenExpired(token);    
  }

  logout(){
    let localStorage = window.localStorage;
    localStorage.removeItem('token');
    this.router.navigate(['home']);  
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

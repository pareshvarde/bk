import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { bkAuthService } from '../services/auth-service';

@Injectable()
export class AuthGuard implements CanActivate {
 
  constructor(private auth: bkAuthService, private router: Router) {}
 
  canActivate() {
      
    if(this.auth.authenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
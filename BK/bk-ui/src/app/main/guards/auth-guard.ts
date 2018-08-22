import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { bkAuthService } from '../services/auth-service';

@Injectable()
export class AuthGuard implements CanActivate {
 
  constructor(private auth: bkAuthService, private router: Router) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
    if(this.auth.authenticated()) {
      return true;
    } else {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}

@Injectable()
export class LoggedInGuard implements CanActivate {
 
  constructor(private auth: bkAuthService, private router: Router) {}
 
  canActivate() {
      
    if(!this.auth.authenticated()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
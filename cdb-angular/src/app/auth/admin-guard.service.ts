import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminGuardService implements CanActivate {
    constructor(public auth: AuthenticationService, public router: Router) {}  
    
    canActivate(route: ActivatedRouteSnapshot): boolean {
    
    if ( !this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    if (!this.auth.isLoggedInAsAdmin) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
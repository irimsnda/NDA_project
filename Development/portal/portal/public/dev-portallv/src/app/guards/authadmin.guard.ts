import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  isAdminLoggedIn:any;
  constructor(private auth: AuthService, private myRoute: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let user = this.auth.getUserDetails();
    
    this.isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    
    if (this.isAdminLoggedIn) {
      return true;
    } else {
      this.myRoute.navigate(["/"]);
      return false;
    }

  }
}

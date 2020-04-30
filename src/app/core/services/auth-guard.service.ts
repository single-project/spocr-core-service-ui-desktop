import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  constructor(private authService: AuthService, public router: Router) { }

  canActivate() {
    if (!this.authService.authorized) {
      this.authService.logout();
      location.reload(true);
      return false;
    }
    return true;
  }
}

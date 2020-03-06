import {Inject, Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Conf} from "../../../assets/config/conf";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config = new Conf();
  constructor(
     private cookies: CookieService,
     private http: HttpClient,
     private router: Router
  ) {
  }

  login(user: string, pswd: string): Observable<any> {

    const authUrl = this.config.BASE_URL + this.config.AUTH_URL;

    return this.http.post(authUrl, {
      username: user,
      password: pswd
    });
  }
  logout(){
    this.cookies.delete('auth_token');
    this.router.navigate(['/', 'signin']);

  }



}

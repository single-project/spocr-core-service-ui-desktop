import {Inject, Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Conf} from "../../../assets/config/conf";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {SESSIONSTORAGE_TOKEN} from "../models/session-storage.token";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config = new Conf();
  private _authorized: boolean;


  get authorized(): boolean {
    return this._authorized;
  }

  set authorized(value: boolean) {
    this._authorized = value;
  }

  constructor(
    private cookies: CookieService,
    private http: HttpClient,
    private router: Router,
    @Inject(SESSIONSTORAGE_TOKEN) private sessionStorage
  ) {
  }

  login(user: string, pswd: string): Observable<any> {
    const authUrl = this.config.BASE_URL + this.config.AUTH_URL;
    return this.http.post(authUrl, {
      username: user,
      password: pswd
    });
  }

  logout() {
    this.sessionStorage.removeItem('auth_token');
    this.router.navigate(['/', 'signin']);
  }


}

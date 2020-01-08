import {Inject, Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Conf} from "../../../assets/config/conf";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config = new Conf();
  constructor(@Inject(CookieService) private cookies: CookieService, @Inject(HttpClient) private http: HttpClient) {
  }

  authorize(user: string, pswd: string): any {

    const authUrl = this.config.BASE_URL + this.config.AUTH_URL;

    return this.http.post(authUrl, {
      username: user,
      password: pswd
    });
  }


}

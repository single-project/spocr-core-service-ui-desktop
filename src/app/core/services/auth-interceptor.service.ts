import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { SESSIONSTORAGE_TOKEN } from "../models/session-storage.token";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private cookie: CookieService,
              @Inject(SESSIONSTORAGE_TOKEN) private sessionStorage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dadataURL = /suggestions/gi;
    let token = '';
    if (req.url.search(dadataURL) === -1) {
      token = `Bearer ${this.sessionStorage.getItem('auth_token')}`
    } else {
      token = `Token 23c98edeae3d036484034a201a493bb418139a7c`
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', token),

    });
    return next.handle(authReq);
  }

}

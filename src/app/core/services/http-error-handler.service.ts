import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthInterceptorService} from "./auth-interceptor.service";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let error = err;
      console.log(JSON.stringify(error));
      if (error.status === 0) {
        error.status = 501;
      }
      if (error.status === 401) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }
}

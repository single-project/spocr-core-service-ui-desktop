import {Inject, Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(CookieService) private cookie: CookieService, @Inject(Router) private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.cookie.get('auth_token')}`),

    });
    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) console.log('Server response')
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              console.log('Unauthorized');
              this.router.navigate(['/', 'signin']);

            }
          }
        }
      )
    )
  }

}

import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {MessageServiceFacadeService} from './message-service-facade.service';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService implements HttpInterceptor {

  constructor(private authService: AuthService, private messageService: MessageServiceFacadeService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      const error = err;
      console.log(JSON.stringify(error));
      if (error.status === 0) {
        error.status = 501;
      }
      if (error.status === 401) {

        if (this.authService.authorized) {
          this.messageService.showErrMsg('authorization-timed-out');
          this.authService.logout();
          location.reload();
        } else {
          this.messageService.showErrMsg('401');
        }
      }
      return throwError(error);
    }));
  }
}

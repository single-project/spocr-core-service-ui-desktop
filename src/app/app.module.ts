import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {PagesModule} from './pages/pages.module';
import {LayoutModule} from './layout/layout.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AuthInterceptorService} from './core/services/auth-interceptor.service';
import {MessageService, ToastModule} from 'primeng';
import {HttpErrorHandlerService} from './core/services/http-error-handler.service';
import {SESSIONSTORAGE_TOKEN} from './core/models/session-storage.token';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    PagesModule,
    LayoutModule,
    ToastModule
  ],
  providers: [
    CookieService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerService,
      multi: true
    },
    {
      provide: SESSIONSTORAGE_TOKEN,
      useFactory: () => sessionStorage
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

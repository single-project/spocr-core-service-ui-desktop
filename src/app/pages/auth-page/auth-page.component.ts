import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthModel} from '../../core/models/auth.model';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtModel} from '../../core/models/jwt.model';
import {MessageServiceFacadeService} from '../../core/services/message-service-facade.service';
import {SESSIONSTORAGE_TOKEN} from '../../core/models/session-storage.token';

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  username: string;
  password: string;
  private authorized: boolean;

  constructor(
    private auth: AuthService,
    private cookies: CookieService,
    private router: Router,
    private messageService: MessageServiceFacadeService,
    @Inject(SESSIONSTORAGE_TOKEN) private sessionStorage) {
  }

  static parseToken(token: string): JwtModel {
    const decoded = jwtHelper.decodeToken(token);
    const dt = new Date(0);
    dt.setUTCSeconds(decoded.exp);
    return {user: decoded.sub, expAt: dt, roles: decoded.roles};
  }

  ngOnInit() {

  }

  onAuthClick(): void {
    if (this.username && this.password) {
      this.auth.login(this.username, this.password).subscribe((resp: AuthModel) => {
        const jwt: JwtModel = AuthPageComponent.parseToken(resp.token);
        this.sessionStorage.setItem('auth_token', resp.token);
        this.auth.authorized = true;
        this.router.navigate(['/', 'main']);
      }, error => {
        this.auth.authorized = false;
        this.sessionStorage.delete('auth_token');
        this.onError(error.status);

      });
    }
  }

  onError(key: string) {
    this.messageService.showErrMsg(key.toString());
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {AuthModel} from "../../core/models/auth.model";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JwtModel} from "../../core/models/jwt.model";
import {MessageServiceFacadeService} from "../../core/services/message-service-facade.service";

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  private username: string;
  private password: string;
  private authorized: boolean;

  constructor(@Inject(AuthService) private auth: AuthService, @Inject(CookieService) private cookies: CookieService,
              @Inject(Router) private router: Router, @Inject(MessageServiceFacadeService) private messageService: MessageServiceFacadeService) {
  }

  ngOnInit() {

  }

  onAuthClick(): void {
    if (this.username && this.password) {
      this.auth.login(this.username, this.password).subscribe((resp: AuthModel) => {
        let jwt: JwtModel = AuthPageComponent.parseToken(resp.token);
        this.cookies.set('auth_token', resp.token, jwt.expAt);
        this.authorized = true;
        this.router.navigate(['/', 'main'])
      }, error => {
        this.authorized = false;
        this.cookies.delete('auth_token');
        this.onError(error.status);

      });
    }
  }

  static parseToken(token: string): JwtModel {
    let decoded = jwtHelper.decodeToken(token);
    const dt = new Date(0);
    dt.setUTCSeconds(decoded.exp);
    return {user: decoded.sub, expAt: dt, roles: decoded.roles};
  }

  onError(key: string) {
    this.messageService.showErrMsg(key.toString())
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {AuthModel} from "../../core/models/auth.model";
import {Router} from "@angular/router";
import {Message} from "primeng";


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  private username: string;
  private password: string;
  private authorized: boolean;
  private msgs: Message[] = [];

  constructor(@Inject(AuthService) private auth: AuthService, @Inject(CookieService) private cookies: CookieService, @Inject(Router) private router: Router) {
  }

  ngOnInit() {

  }

  onAuthClick(): void {
    if (this.username && this.password) {
      this.auth.authorize(this.username, this.password).subscribe((resp: AuthModel) => {
        this.cookies.set('auth_token', resp.token, parseInt(resp.tokenTTL));
        this.authorized = true;
        this.router.navigate(['/', 'main'])
      }, error => {
        if (error.status === 401) {
          console.log(error);
          this.cookies.delete('auth_token');
          this.authorized = false;
          this.onAuthError();
        } else {
          console.log(error);
          this.cookies.delete('auth_token');
          this.authorized = false;
          this.onServerError();
        }

      });
    }

  }

  onAuthError() {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Неверное имя и/или пароль', detail: ''});
  }

  onServerError() {
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: 'Что-то пошло не так, попробуйте позже', detail: ''});
  }
}

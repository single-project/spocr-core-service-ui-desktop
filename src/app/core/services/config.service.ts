import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conf} from "../../../assets/config/conf";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = new Conf();
  private shopUrl: string = this.config.BASE_URL + this.config.SHOP_URL;

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  fetchConfig() {
    return this.http.get('assets/config/cfg.json');
  }

  fetchAppSettings() {
    return this.http.get(`${this.config.BASE_URL}/api/app/settings`);
  }
}

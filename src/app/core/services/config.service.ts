import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  fetchConfig(): Observable<any> {

    return this.http.get('assets/config/cfg.json');

  }

}

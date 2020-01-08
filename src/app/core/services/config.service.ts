import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthModel} from "../models/auth.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  fetchConfig() {

    return this.http.get('assets/config/cfg.json');

  }
}

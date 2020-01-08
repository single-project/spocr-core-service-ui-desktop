import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conf} from "../../../assets/config/conf";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesService {

  config = new Conf();

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  fetchCounterPartiesData(): Observable<any>{
    const counterPartiesURL = this.config.BASE_URL+this.config.COUNTERPARTIES_URL;
    return this.http.get(counterPartiesURL);
  }

}

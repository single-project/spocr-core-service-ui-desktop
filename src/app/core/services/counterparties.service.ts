import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conf} from "../../../assets/config/conf";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesService {

  private config = new Conf();
  private counterpartiesURL = this.config.BASE_URL + this.config.COUNTERPARTIES_URL;

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  fetchCounterPartiesData(): Observable<any> {

    return this.http.get(this.counterpartiesURL);
  }


  editShop(updateData: {}, id: number): Observable<any> {

    return this.http.patch(`${this.counterpartiesURL}/${id}`, updateData)
  }

  newShop(shopData: {}): Observable<any> {
    return this.http.post(this.counterpartiesURL, shopData);
  }

}

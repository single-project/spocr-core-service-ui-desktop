import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesService {

  private config = new Conf();
  private counterpartiesURL = this.config.BASE_URL + this.config.COUNTERPARTIES_URL;

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  fetchCounterPartiesData(options = {}): Observable<any> {
    return this.http.get(
      this.counterpartiesURL,
      {
        params: {...options}
      });
  }

  editCounterparty(updateData: {}, id: number):any {

    return this.http.patch(`${this.counterpartiesURL}/${id}`, updateData)
  }

  newCounterparty(updateData: {}): Observable<any> {
    return this.http.post(this.counterpartiesURL, updateData);
  }

}

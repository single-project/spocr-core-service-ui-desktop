import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';
import {Observable} from "rxjs";
import {GlobalItemServiceModel} from '../models/global-item-service.model';

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesService extends GlobalItemServiceModel{

  private config = new Conf();
  private counterpartiesURL = this.config.BASE_URL + this.config.COUNTERPARTIES_URL;


  fetchData(options = {}): Observable<any> {
    return this.http.get(
      this.counterpartiesURL,
      {
        params: {...options}
      });
  }

  fetchCounterpartiesStatuses(): Observable<any>{
    return this.http.get(this.config.BASE_URL+this.config.CP_STATUSES_URL);
  }

  editItem(updateData: {}, id: number):any {

    return this.http.patch(`${this.counterpartiesURL}/${id}`, updateData)
  }

  newItem(updateData: {}): Observable<any> {
    return this.http.post(this.counterpartiesURL, updateData);
  }

}

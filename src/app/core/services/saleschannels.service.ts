import {Inject, Injectable} from '@angular/core';
import {Conf} from '../../../assets/config/conf';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleschannelsService {
  private config = new Conf();
  private salesChanURL = this.config.BASE_URL + this.config.SALES_CHANNELS_URL;

  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) {
  }

  fetchAllSalesChannels(): Observable<any> {
    return this.http.get(this.salesChanURL);
  }

  editSalesChannel(id: number, options = {}): Observable<any> {
    return this.http.patch(`${this.salesChanURL}/${id}`, {...options});
  }

  newSalesChannel(options = {}): Observable<any>{
    return this.http.post(this.salesChanURL, {...options});
  }

}

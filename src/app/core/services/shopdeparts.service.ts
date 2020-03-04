import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conf} from '../../../assets/config/conf';

@Injectable({
  providedIn: 'root'
})
export class ShopdepartsService {
  private config = new Conf();
  constructor(private http: HttpClient) { }


  private srvUrl: string = this.config.BASE_URL + this.config.SHOP_DEPARTS_URL;



  fetchData(options = {}): Observable<any> {
    return this.http.get(
      this.srvUrl,
      {
        params: {...options}
      });
  }

  editItem(updateData: {}, id: number): Observable<any> {
    return this.http.patch(`${this.srvUrl}/${id}`, updateData)
  }

  newItem(shopData: {}): Observable<any> {
    return this.http.post(this.srvUrl, shopData);
  }



}

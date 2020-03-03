import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopdepartsService {

  private config = new Conf();
  private srvUrl: string = this.config.BASE_URL + this.config.SHOP_DEPARTS_URL;

  constructor(
    private http: HttpClient) {
  }

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

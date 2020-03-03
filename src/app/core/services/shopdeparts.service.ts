import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conf} from '../../../assets/config/conf';

@Injectable({
  providedIn: 'root'
})
export class ShopdepartsService {
  private config = new Conf();
  constructor(@Inject(HttpClient) private http: HttpClient) { }

  fetchShopDeparts(): Observable<any>{
    return this.http.get(this.config.BASE_URL+this.config.SHOP_DEPARTS_URL)
  }

  newShopDepart(options ={}): Observable<any>{
    return this.http.post(this.config.BASE_URL+this.config.SHOP_DEPARTS_URL, {...options})
  }

  editShopDepart(id: number, options ={}): Observable<any>{
    return this.http.patch(this.config.BASE_URL+this.config.SHOP_DEPARTS_URL+id, {...options})
  }

}

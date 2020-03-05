import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conf} from '../../../assets/config/conf';
import {GlobalItemServiceModel} from '../models/global-item-service.model';

@Injectable({
  providedIn: 'root'
})
export class ShopTypesService extends GlobalItemServiceModel{
  private config = new Conf();
  private shopTypesURL: string = this.config.BASE_URL + this.config.SHOP_TYPES_URL;

  fetchData(options = {}): Observable<any> {
    return this.http.get(
      this.shopTypesURL,
      {
        params: {...options}
      });
  }

  editItem(updateData: {}, id: number): Observable<any> {
    return this.http.patch(`${this.shopTypesURL}/${id}`, updateData)
  }

  newItem(shopData: {}): Observable<any> {
    return this.http.post(this.shopTypesURL, shopData);
  }

}

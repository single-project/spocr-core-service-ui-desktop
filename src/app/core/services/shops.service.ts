import {Inject, Injectable} from '@angular/core';
import {Conf} from "../../../assets/config/conf";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalItemServiceModel} from '../models/global-item-service.model';

@Injectable({
  providedIn: 'root'
})
export class ShopsService extends GlobalItemServiceModel{

  private config = new Conf();
  private shopUrl: string = this.config.BASE_URL + this.config.SHOP_URL;

  fetchData(options = {}): Observable<any> {
    return this.http.get(
      this.shopUrl,
      {
        params: {...options}
      });
  }

  editItem(updateData: {}, id: number): Observable<any> {
    return this.http.patch(`${this.shopUrl}/${id}`, updateData)
  }

  newItem(shopData: {}): Observable<any> {
    return this.http.post(this.shopUrl, shopData);
  }

  shopTypeAdd(typeData: [], id: number): any {
    return this.http.put(`${this.shopUrl}/${id}`, typeData);
  }
}

import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conf} from "../../../assets/config/conf";

@Injectable({
  providedIn: 'root'
})
export class ShopTypesService {
  private config = new Conf();
  private shopTypesURL: string = this.config.BASE_URL + this.config.SHOP_TYPES_URL;

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  fetchShopTypesData(): any{
    return this.http.get(this.shopTypesURL);
  }

  editShopType(updateData: {}, id: number): Observable<any> {
    return this.http.patch(`${this.shopTypesURL}/${id}`, updateData)
  }

  newShopType(shopData: {}): Observable<any> {
    return this.http.post(this.shopTypesURL, shopData);
  }

}

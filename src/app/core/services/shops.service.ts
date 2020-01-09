import {Inject, Injectable} from '@angular/core';
import {Conf} from "../../../assets/config/conf";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private config = new Conf();
  private shopUrl: string = this.config.BASE_URL + this.config.SHOP_URL;

  constructor(@Inject(HttpClient) private http: HttpClient,
  ) {
  }

  fetchShopData(): Observable<any> {
    return this.http.get(this.shopUrl);
  }

  editShop(updateData: {}, id: number): Observable<any> {

    return this.http.patch(`${this.shopUrl}/${id}`, updateData)
  }

  newShop(shopData: {}): Observable<any> {
    return this.http.post(this.shopUrl, shopData);
  }


}

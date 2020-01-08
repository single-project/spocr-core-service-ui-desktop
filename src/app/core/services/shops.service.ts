import {Inject, Injectable} from '@angular/core';
import {Conf} from "../../../assets/config/conf";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private config = new Conf();

  constructor(@Inject(HttpClient) private http: HttpClient,

  ) {
  }

  fetchShopData(): Observable<any> {
    const shopDataURL = this.config.BASE_URL + this.config.SHOP_URL;

    return this.http.get(shopDataURL);
  }

  editShop(updateData: {}): Observable<any>{
    const shopDataURL = this.config.BASE_URL + this.config.SHOP_URL;
    return this.http.patch(shopDataURL, updateData)
  }


}

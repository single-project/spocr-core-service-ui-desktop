import {Inject, Injectable} from '@angular/core';
import {Conf} from "../../../assets/config/conf";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private config = new Conf();

  constructor(@Inject(HttpClient) private http: HttpClient,

  ) {
  }

  fetchShopData() {
    const shopDataURL = this.config.BASE_URL + this.config.SHOP_URL;

    return this.http.get(shopDataURL);
  }

}

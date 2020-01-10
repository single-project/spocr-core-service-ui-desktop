import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conf} from "../../../assets/config/conf";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private config = new Conf();
  private shopsURL = this.config.BASE_URL + this.config.SHOP_URL;
  private shopTypesURL = this.config.BASE_URL + this.config.SHOP_TYPES_URL;
  private manufactureURL = this.config.BASE_URL + this.config.MANUFACTURES_URL;
  private counterpartiesURL = this.config.BASE_URL + this.config.COUNTERPARTIES_URL;

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  activeFilter(dataSet: number, active: boolean): any {
    switch (dataSet) {
      case 1:
       return  this.http.get(`${this.shopsURL}?active=${active}`);

      case 2:
       return  this.http.get(`${this.counterpartiesURL}?active=${active}`);

      case 3:
       return  this.http.get(`${this.manufactureURL}?active=${active}`);

      case 4:
       return  this.http.get(`${this.shopTypesURL}?active=${active}`);

    }
  }

}

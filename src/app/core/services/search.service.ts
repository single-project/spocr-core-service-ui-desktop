import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conf} from "../../../assets/config/conf";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private config = new Conf();
  constructor( private http: HttpClient) { }

  shopSearch(searchString: string): Observable<any>{
    const searchURL = this.config.BASE_URL + this.config.SHOP_URL;
    return this.http.get(`${searchURL}?q=${searchString}`);
  }
  counterpartiesSearch(searchString: string): Observable<any>{
    const searchURL = this.config.BASE_URL + this.config.COUNTERPARTIES_URL;
    return this.http.get(`${searchURL}?q=${searchString}`);
  }
  manufactureSearch(searchString: string): Observable<any>{
    const searchURL = this.config.BASE_URL + this.config.MANUFACTURES_URL;
    return this.http.get(`${searchURL}?q=${searchString}`);
  }
  shopTypeSearch(searchString: string): Observable<any>{
    const searchURL = this.config.BASE_URL + this.config.SHOP_TYPES_URL;
    return this.http.get(`${searchURL}?q=${searchString}`);
  }

}

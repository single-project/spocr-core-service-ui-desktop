import {Inject, Injectable} from '@angular/core';
import {Conf} from "../../../assets/config/conf";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManufactureService {
  private config = new Conf();
  private manufactureURL: string = this.config.BASE_URL + this.config.MANUFACTURES_URL;

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  fetchManufacturesData(): Observable<any> {
    return this.http.get(this.manufactureURL);
  }

  editManufacture(updateData: {}, id: number): Observable<any> {
    return this.http.patch(`${this.manufactureURL}/${id}`, updateData)
  }

  newManufacture(shopData: {}): Observable<any> {
    return this.http.post(this.manufactureURL, shopData);
  }
}

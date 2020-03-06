import {Inject, Injectable} from '@angular/core';
import {Conf} from '../../../assets/config/conf';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalItemServiceModel} from '../models/global-item-service.model';

@Injectable({
  providedIn: 'root'
})
export class ManufactureService extends GlobalItemServiceModel{
  private config = new Conf();
  private manufactureURL: string = this.config.BASE_URL + this.config.MANUFACTURES_URL;

  fetchData(options = {}): Observable<any> {
    return this.http.get(
      this.manufactureURL,
      {
        params: {...options}
      });
  }

  editItem(updateData: {}, id: number): Observable<any> {
    return this.http.patch(`${this.manufactureURL}/${id}`, updateData)
  }

  newItem(shopData: {}): Observable<any> {
    return this.http.post(this.manufactureURL, shopData);
  }
}

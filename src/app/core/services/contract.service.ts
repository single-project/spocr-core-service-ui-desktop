import {Injectable} from '@angular/core';
import {Conf} from '../../../assets/config/conf';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalItemServiceModel} from '../models/global-item-service.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends GlobalItemServiceModel{
  private config = new Conf();
  private srvUrl: string = this.config.BASE_URL + this.config.CONTRACTS_URL;


  fetchData(options = {}): Observable<any> {
    return this.http.get(
      this.srvUrl,
      {
        params: {...options}
      });
  }

  editItem(updateData: {}, id: number): Observable<any> {
    return this.http.patch(`${this.srvUrl}/${id}`, updateData)
  }

  newItem(shopData: {}): Observable<any> {
    return this.http.post(this.srvUrl, shopData);
  }
}

import {Injectable} from '@angular/core';
import {Conf} from '../../../assets/config/conf';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnumerationService {
  private config = new Conf();

  constructor(private http: HttpClient) {
  }

  fetchContractTypes(): Observable<any> {
    return this.http.get(this.config.BASE_URL + this.config.CONTRACT_TYPE_URL);
  }

  fetchContractStatuses(): Observable<any> {
    return this.http.get(this.config.BASE_URL + this.config.CONTRACT_STATUS_URL);
  }
}

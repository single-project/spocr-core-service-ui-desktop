import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export abstract class GlobalItemServiceModel {
  protected constructor(protected http: HttpClient) {
  }

  fetchData(url?: string): Observable<any> {
    return this.http.get(url);
  }

  newItem(url?: string, options = {}): Observable<any> {
    return this.http.post(url, options);
  }

  editItem(url?: string, id?: number, options = {}): Observable<any> {
    return this.http.patch(`${url}+${id}`, options);
  }


}

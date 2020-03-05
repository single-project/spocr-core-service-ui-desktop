import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';

@Injectable({
  providedIn: 'root'
})
export class PersonalRekvService {

  private config = new Conf();
  constructor( private http: HttpClient) { }

  fetchDocTypes(): Observable<any>{
    return this.http.get(this.config.BASE_URL+this.config.DOC_TYPES_URL);
  }
  fetchCitizenship(): Observable<any>{
    return this.http.get(this.config.BASE_URL+this.config.CITIZENSHIP_URL);
  }
  fetchGender(): Observable<any>{
    return this.http.get(this.config.BASE_URL+this.config.GENDER_URL);
  }
}

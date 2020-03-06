import {Injectable} from '@angular/core';
import {IdentifiedEntity} from "../models/identified.entity";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReferenceResponseModel} from "../models/reference-response.model";

@Injectable({
  providedIn: 'root'
})
export abstract class IdentifiedEntityService<T extends IdentifiedEntity> implements IdentifiedEntityServiceI<T> {

  protected constructor(public params: any, private _http: HttpClient) {
  }

  get(options = {}): Observable<ReferenceResponseModel<T>> {
    return this._http.get<ReferenceResponseModel<T>>(
      this.params.url,
      {
        params: {...options}
      });
  }

  patch(entity: T): Observable<T> {
    return this._http.patch<T>(`${this.params.url}/${entity.id}`, entity)
  }

  post(entity: T): Observable<T> {
    return this._http.post<T>(this.params.url, entity);
  }
}

interface IdentifiedEntityServiceI<T> {

  get(options): Observable<ReferenceResponseModel<T>>;

  post(entity: T): Observable<T>;

  patch(entity: T): Observable<T>;
}

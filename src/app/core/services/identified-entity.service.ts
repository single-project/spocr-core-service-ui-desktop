import {Injectable, InjectionToken, Injector} from '@angular/core';
import {IdentifiedEntity} from "../models/identified.entity";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReferenceResponseModel} from "../models/reference-response.model";
import {Conf} from "../../../assets/config/conf";
import {publish} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export abstract class IdentifiedEntityService<T extends IdentifiedEntity> implements IdentifiedEntityServiceI<T> {

  protected params = {} as Config;

  protected constructor(private _http: HttpClient) {

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

export interface Config {
  url: string;
}

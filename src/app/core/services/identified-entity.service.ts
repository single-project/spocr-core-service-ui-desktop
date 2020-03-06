import {IdentifiedEntity} from "../models/identified.entity";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReferenceResponseModel} from "../models/reference-response.model";
import {ServiceConfig} from "../models/global-reference.model";

export abstract class IdentifiedEntityService<T extends IdentifiedEntity> implements IdentifiedEntityServiceI<T> {

  protected constructor(private _params: ServiceConfig, private _http: HttpClient) {

  }

  get(options = {}): Observable<ReferenceResponseModel<T>> {
    return this._http.get<ReferenceResponseModel<T>>(
      this._params.url,
      {
        params: {...options}
      });
  }

  patch(entity: T): Observable<T> {
    return this._http.patch<T>(`${this._params.url}/${entity.id}`, entity)
  }

  post(entity: T): Observable<T> {
    return this._http.post<T>(this._params.url, entity);
  }
}

interface IdentifiedEntityServiceI<T> {

  get(options): Observable<ReferenceResponseModel<T>>;

  post(entity: T): Observable<T>;

  patch(entity: T): Observable<T>;
}

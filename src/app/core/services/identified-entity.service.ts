import {IdentifiedEntity} from '../models/identified.entity';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ReferenceResponseModel} from '../models/reference-response.model';
import {ServiceConfig} from '../models/global-reference.model';
import {ConfigService} from './config.service';

export abstract class IdentifiedEntityService<T extends IdentifiedEntity> implements IdentifiedEntityServiceI<T> {

  protected config = {} as ServiceConfig;

  protected constructor(private configService: ConfigService, protected http: HttpClient) {
    this.getConfig(configService);
  }

  abstract getConfig(configService: ConfigService);

  get(options = {}): Observable<ReferenceResponseModel<T>> {
    return this.http.get<ReferenceResponseModel<T>>(
      this.config.url,
      {
        params: {...options}
      });
  }

  patch(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.config.url}/${entity.id}`, entity);
  }

  post(entity: T): Observable<T> {
    return this.http.post<T>(this.config.url, entity);
  }

}

interface IdentifiedEntityServiceI<T> {

  get(options): Observable<ReferenceResponseModel<T>>;

  post(entity: T): Observable<T>;

  patch(entity: T): Observable<T>;
}

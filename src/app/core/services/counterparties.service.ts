import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {IdentifiedEntityService} from "./identified-entity.service";
import {CounterpartyModel} from "../models/global-reference.model";
import {ConfigService} from "./config.service";
import {AppTableTypes} from "../models/app-tabe-types.enum";

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesService extends IdentifiedEntityService<CounterpartyModel> {

  constructor(private configService: ConfigService, private http: HttpClient) {
    super(configService, http);
  }

  getConfig(configService: ConfigService) {
    configService.fetchDataTypeEndpointURL(AppTableTypes.COUNTER_PARTIES_TABLE_TYPE).subscribe(d => this.config.url = d.url)
  }


  fetchCounterpartiesStatuses(): Observable<any> {
    return of({});
  }

  newItem(updateData: {}): Observable<any> {
    return of({});
  }

}

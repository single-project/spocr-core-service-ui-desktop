import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IdentifiedEntityService} from "./identified-entity.service";
import {CounterpartyModel} from "../models/global-reference.model";
import {ConfigService} from "./config.service";
import {AppTableTypes} from "../models/app-tabe-types.enum";
import {Conf} from "../../../assets/config/conf";

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesService extends IdentifiedEntityService<CounterpartyModel> {
  private cfg = new Conf();

  constructor(private configService: ConfigService, private http: HttpClient) {
    super(configService, http);
  }

  getConfig(configService: ConfigService) {
    configService.fetchDataTypeEndpointURL(AppTableTypes.COUNTER_PARTIES_TABLE_TYPE).subscribe(d => this.config.url = d.url)
  }


  fetchCounterpartiesStatuses(): Observable<any> {
    return this.http.get(this.cfg.BASE_URL + this.cfg.CP_STATUSES_URL);
  }


}

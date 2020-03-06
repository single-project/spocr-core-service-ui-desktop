import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IdentifiedEntityService} from "./identified-entity.service";
import {ContractModel} from "../models/global-reference.model";
import {ConfigService} from "./config.service";
import {AppTableTypes} from "../models/app-tabe-types.enum";

@Injectable({
  providedIn: 'root'
})
export class ContractService extends IdentifiedEntityService<ContractModel> {

  constructor(private configService: ConfigService, private http: HttpClient) {
    super(configService, http);
  }

  getConfig(configService: ConfigService) {
    configService.fetchDataTypeEndpointURL(AppTableTypes.CONTRACTS_TABLE_TYPE).subscribe(d => this.config.url = d.url)
  }

}

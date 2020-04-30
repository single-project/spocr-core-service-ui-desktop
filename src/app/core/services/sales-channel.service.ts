import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IdentifiedEntityService} from './identified-entity.service';
import {SalesChannelModel} from '../models/global-reference.model';
import {ConfigService} from './config.service';
import {AppTableTypes} from '../models/app-tabe-types.enum';

@Injectable({
  providedIn: 'root'
})
export class SalesChannelService extends IdentifiedEntityService<SalesChannelModel> {

  constructor(configService: ConfigService, http: HttpClient) {
    super(configService, http);
  }

  getConfig(configService: ConfigService) {
    configService
      .fetchDataTypeEndpointURL(
        AppTableTypes.SALES_CHANELS_TABLE_TYPE)
      .subscribe(d => this.config.url = d.url);
  }

}

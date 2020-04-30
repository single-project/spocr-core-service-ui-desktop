import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopTypeModel} from '../models/global-reference.model';
import {IdentifiedEntityService} from './identified-entity.service';
import {AppTableTypes} from '../models/app-tabe-types.enum';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ShopTypesService extends IdentifiedEntityService<ShopTypeModel> {

  constructor(configService: ConfigService, http: HttpClient) {
    super(configService, http);
  }

  getConfig(configService: ConfigService) {
    configService
      .fetchDataTypeEndpointURL(
        AppTableTypes.SHOP_TYPES_TABLE_TYPE)
      .subscribe(d => this.config.url = d.url);
  }
}

import { Injectable } from '@angular/core';
import {IdentifiedEntityService} from './identified-entity.service';
import {ExtRegSystemModel} from '../models/global-reference.model';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {AppTableTypes} from '../models/app-tabe-types.enum';

@Injectable({
  providedIn: 'root'
})
export class ExtRegSystemService extends IdentifiedEntityService<ExtRegSystemModel> {

  constructor(private configService: ConfigService, private http: HttpClient) {
    super(configService, http);
  }

  getConfig(configService: ConfigService) {
    configService.fetchDataTypeEndpointURL(
      AppTableTypes.EXT_REG_SYSTEM_TABLE_TYPE)
      .subscribe(d => this.config.url = d.url)
  }

}

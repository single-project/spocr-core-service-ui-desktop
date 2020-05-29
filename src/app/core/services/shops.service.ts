import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IdentifiedEntityService} from "./identified-entity.service";
import {ShopModel} from "../models/global-reference.model";
import {ConfigService} from "./config.service";
import {AppTableTypes} from "../models/app-tabe-types.enum";

@Injectable({
  providedIn: 'root'
})
export class ShopsService extends IdentifiedEntityService<ShopModel> {

  constructor(private configService: ConfigService, private http: HttpClient) {
    super(configService, http);
  }

  getConfig(configService: ConfigService) {
    configService.fetchDataTypeEndpointURL(AppTableTypes.SHOP_TABLE_TYPE).subscribe(d => this.config.url = d.url)
  }

}

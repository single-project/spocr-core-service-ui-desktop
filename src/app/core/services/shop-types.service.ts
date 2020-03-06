import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';
import {ServiceConfig, ShopTypeModel} from "../models/global-reference.model";
import {IdentifiedEntityService} from "./identified-entity.service";

@Injectable({
  providedIn: 'root'
})
export class ShopTypesService extends IdentifiedEntityService<ShopTypeModel> {

  constructor(private http: HttpClient) {
    super(ShopTypesService.constructUrl(), http);
  }


  //TODO: get url from config service by datatype(or key)
  static constructUrl(): ServiceConfig {
    let config = new Conf();
    return {url: config.BASE_URL + config.SHOP_TYPES_URL};
  }

}

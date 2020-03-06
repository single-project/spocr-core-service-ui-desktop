import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';
import {ShopTypeModel} from "../models/global-reference.model";
import {Config, IdentifiedEntityService} from "./identified-entity.service";

@Injectable({
  providedIn: 'root'
})
export class ShopTypesService extends IdentifiedEntityService<ShopTypeModel> {

  protected params;

  constructor(private http: HttpClient) {
    super(http);
    this.params = ShopTypesService.constructUrl();
  }

  static constructUrl(): Config {
    let config = new Conf();
    let params = {} as Config;
    params.url = config.BASE_URL + config.SHOP_TYPES_URL;
    return params;
  }

}

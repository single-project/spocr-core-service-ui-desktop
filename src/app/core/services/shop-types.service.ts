import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';
import {ShopTypeModel} from "../models/global-reference.model";
import {IdentifiedEntityService} from "./identified-entity.service";

@Injectable({
  providedIn: 'root'
})
export class ShopTypesService extends IdentifiedEntityService<ShopTypeModel> {

  constructor(private http: HttpClient) {
    super({url: ShopTypesService.constructUrl()}, http)
  }

  static constructUrl(): string {
    let config = new Conf();
    return config.BASE_URL + config.SHOP_TYPES_URL;
  }

}

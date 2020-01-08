import {CounterpartyModel} from "./counterparty.model";


export interface ShopModel {
  version: number;
  id: number;
  name: string;
  counterparty: string;
  shopTypes?: [];
  active: boolean;
}

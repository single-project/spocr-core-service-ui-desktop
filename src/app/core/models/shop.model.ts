import {CounterpartyModel} from "./counterparty.model";


export interface ShopModel {
  version: number;
  id: number;
  name: string;
  counterpartyName: string;
  counterpartyId: number;
  counterparty: CounterpartyModel;
  shopTypes?: [];
  active: boolean;
}

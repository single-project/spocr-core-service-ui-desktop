import {CounterpartyModel} from "./counterparty.model";
import {AddressSuggestion} from "./suggestion-address.model";



  export interface Manufacturer {
    id: number;
    version: number;
    active: boolean;
    name: string;
  }

  export interface ShopType {
    id: number;
    version: number;
    active: boolean;
    name: string;
    manufacturer: Manufacturer;
  }

  export interface ShopAddress {
    id: number;
    version: number;
    active: boolean;
    address: string;
    comment?: any;
    suggestion: AddressSuggestion;
  }

  export interface Counterparty {
    id: number;
    version: number;
    active: boolean;
    name: string;
  }

  export interface ShopModel {
    id: number;
    version: number;
    active: boolean;
    name: string;
    shopTypes: ShopType[];
    address: ShopAddress;
    counterparty: Counterparty;
    counterpartyName: string;
    counterpartyId: number;
  }




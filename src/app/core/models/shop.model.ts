import {AddressSuggestion} from "./suggestion-address.model";


export interface ShopManufacturer {
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
    manufacturer: ShopManufacturer;
  }

  export interface ShopAddress {
    id: number;
    version: number;
    active: boolean;
    address: string;
    comment?: any;
    suggestion: AddressSuggestion;
  }

  export interface ShopCounterparty {
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
    counterparty: ShopCounterparty;
    counterpartyName?: string;
    counterpartyId?: number;
  }




  export interface ShopAddressSuggestion {
    1: string;
    s1: number;
  }

  export interface ShopAddress {
    id: number;
    version: number;
    active: boolean;
    address: string;
    comment?: any;
    suggestion: ShopAddressSuggestion;
    latitude?: any;
    longitude?: any;
  }

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

  export interface ShopManufacturer2 {
    id: number;
    version: number;
    active: boolean;
    name: string;
  }

  export interface ShopSalesChannel {
    id: number;
    version: number;
    active: boolean;
    name: string;
    manufacturer: ShopManufacturer2;
  }

  export interface ShopCounterpartyLegalType {
    id: number;
    version: number;
    active: boolean;
    name: string;
    opfShort: string;
    opfFull: string;
    opfCode: string;
    opfType: string;
  }

  export interface ShopCounterpartyLegalRekv {
    shortName?: any;
    fullName?: any;
    inn?: any;
    kpp?: any;
    ogrn?: any;
    ogrnDate?: any;
    ogrnAuthority?: any;
    okpo?: any;
    okonh?: any;
  }

  export interface ShopCounterpartyPaymentDetails {
    id: number;
    version: number;
    active: boolean;
    paymentAccount: string;
    correspondingAccount: string;
    bic: string;
    bank: string;
  }

  export interface ShopCounterparty {
    id: number;
    version: number;
    active: boolean;
    name: string;
    legalType: ShopCounterpartyLegalType;
    legalRekv: ShopCounterpartyLegalRekv;
    paymentDetails: ShopCounterpartyPaymentDetails;
    suggestion?: any;
    parent?: any;
  }

  export interface ShopModel {
    id: number;
    version: number;
    active: boolean;
    name: string;
    address: ShopAddress;
    shopTypes: ShopType[];
    salesChannels: ShopSalesChannel[];
    counterparty: ShopCounterparty;
  }



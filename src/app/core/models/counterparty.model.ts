export interface PartyLegalType {
  id: number;
  version: number;
  active: boolean;
  name: string;
  opfShort: string;
  opfFull: string;
  opfCode: string;
  opfType: string;
}

export interface PartyLegalRekv {
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

export interface PartyPaymentDetails {
  id: number;
  version: number;
  active: boolean;
  paymentAccount: string;
  correspondingAccount: string;
  bic: string;
  bank: string;
}

export interface CounterpartyModel {
  id: number;
  version: number;
  active: boolean;
  name: string;
  legalType: PartyLegalType;
  legalRekv: PartyLegalRekv;
  paymentDetails: PartyPaymentDetails;
  suggestion?: any;
}




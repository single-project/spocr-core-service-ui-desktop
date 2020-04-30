import {AddressData} from './suggestion-address.model';

export interface PartyManagement {
  name: string;
  post: string;
  disqualified?: any;
}

export interface PartyState {
  status: string;
  actuality_date: number;
  registration_date: number;
  liquidation_date?: any;
}

export interface PartyOpf {
  type: string;
  code: string;
  full: string;
  short: string;
}

export interface PartyName {
  full_with_opf: string;
  short_with_opf: string;
  latin?: any;
  full: string;
  short: string;
}


export interface PartyAddress {
  value: string;
  unrestricted_value: string;
  data: AddressData;
}

export interface PartyData {
  kpp: string;
  capital?: any;
  management: PartyManagement;
  founders?: any;
  managers?: any;
  branch_type: string;
  branch_count: number;
  source?: any;
  qc?: any;
  hid: string;
  type: string;
  state: PartyState;
  opf: PartyOpf;
  name: PartyName;
  inn: string;
  ogrn: string;
  okpo?: any;
  okved: string;
  okveds?: any;
  authorities?: any;
  documents?: any;
  licenses?: any;
  finance?: any;
  address: PartyAddress;
  phones?: any;
  emails?: any;
  ogrn_date: number;
  okved_type: string;
  employee_count?: any;
}

export interface PartySuggestion {
  value: string;
  unrestricted_value: string;
  data: PartyData;
}

export interface PartySuggestionRoot {
  suggestions: PartySuggestion[];
}




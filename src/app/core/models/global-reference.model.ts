import {IdentifiedEntity} from "./identified.entity";

export interface ServiceConfig {
  url: string;
}

export interface BaseIdentifiedEntity extends IdentifiedEntity {
  version?: number;
  active?: boolean;
}

export interface ShopClassifierModel extends BaseIdentifiedEntity {
  name?: string;
  manufacturer?: ManufacturerModel;
}

export interface EnumerationEntity extends IdentifiedEntity {
  name?: string;
  ident?: string;
  properties?: any;
}

export interface AddressSuggestionModel {
  postal_code?: any;
  country: string;
  country_iso_code: string;
  federal_district?: any;
  region_fias_id: string;
  region_kladr_id: string;
  region_iso_code: string;
  region_with_type: string;
  region_type: string;
  region_type_full: string;
  region: string;
  area_fias_id?: any;
  area_kladr_id?: any;
  area_with_type?: any;
  area_type?: any;
  area_type_full?: any;
  area?: any;
  city_fias_id: string;
  city_kladr_id: string;
  city_with_type: string;
  city_type: string;
  city_type_full: string;
  city: string;
  city_area?: any;
  city_district_fias_id?: any;
  city_district_kladr_id?: any;
  city_district_with_type?: any;
  city_district_type?: any;
  city_district_type_full?: any;
  city_district?: any;
  settlement_fias_id?: any;
  settlement_kladr_id?: any;
  settlement_with_type?: any;
  settlement_type?: any;
  settlement_type_full?: any;
  settlement?: any;
  street_fias_id: string;
  street_kladr_id: string;
  street_with_type: string;
  street_type: string;
  street_type_full: string;
  street: string;
  house_fias_id?: any;
  house_kladr_id?: any;
  house_type?: any;
  house_type_full?: any;
  house?: any;
  block_type?: any;
  block_type_full?: any;
  block?: any;
  flat_type?: any;
  flat_type_full?: any;
  flat?: any;
  flat_area?: any;
  square_meter_price?: any;
  flat_price?: any;
  postal_box?: any;
  fias_id: string;
  fias_code?: any;
  fias_level: string;
  fias_actuality_state?: any;
  kladr_id: string;
  geoname_id?: any;
  capital_marker: string;
  okato: string;
  oktmo: string;
  tax_office: string;
  tax_office_legal: string;
  timezone?: any;
  geo_lat?: any;
  geo_lon?: any;
  beltway_hit?: any;
  beltway_distance?: any;
  metro?: any;
  qc_geo?: any;
  qc_complete?: any;
  qc_house?: any;
  history_values: string[];
  unparsed_parts?: any;
  source?: any;
  qc?: any;
}

export interface AddressModel {
  id: number;
  version: number;
  active: boolean;
  address: string;
  comment?: any;
  suggestion: AddressSuggestionModel;
  latitude?: any;
  longitude?: any;
}

export interface ManufacturerModel extends BaseIdentifiedEntity {
  name?: string;
}

export interface LegalType {
  id: number;
  name: string;
  ident: string;
  properties?: any;
}

export interface LegalRekv extends IdentifiedEntity {
  shortName?: any;
  fullName?: any;
  inn?: any;
  kpp?: any;
  ogrn?: any;
  ogrnDate?: any;
  ogrnAuthority?: any;
  okpo?: any;
  okonh?: any;
  suggestion?: any
}

export interface PaymentDetails {
  id: number;
  paymentAccount: string;
  correspondingAccount: string;
  bic: string;
  bank: string;
}

export interface CounterpartyStatus extends EnumerationEntity {

}

export interface DocType extends EnumerationEntity {

}

export interface Citizenship extends EnumerationEntity {

}

export interface Gender extends EnumerationEntity {

}

export interface PersonRekv extends IdentifiedEntity {
  name: string;
  lastName: string;
  firstName?: any;
  patronymic?: any;
  birthDate: Date;
  birthPlace?: any;
  docType: DocType;
  docSeriesNumber?: any;
  inn?: any;
  citizenship: Citizenship;
  gender: Gender;
  email?: any;
  phones?: any;
}

export interface OwnerModel extends BaseIdentifiedEntity {
  name: string;
}

export interface CounterpartyModel extends BaseIdentifiedEntity {
  name: string;
  owner?: BaseIdentifiedEntity;
  parent?: BaseIdentifiedEntity;
  statuses: EnumerationEntity[];
  legalType?: EnumerationEntity;
  legalRekv?: LegalRekv;
  personRekv?: PersonRekv;
  paymentDetails?: PaymentDetails[];
}


export interface ContractModel extends BaseIdentifiedEntity {

}

export interface ShopSpecializationModel extends ShopClassifierModel {

}

export interface ShopTypeModel extends ShopClassifierModel {

}

export interface SalesChannelModel extends ShopClassifierModel {

}

export interface ShopDepartModel extends ShopClassifierModel {

}


export interface ShopModel extends BaseIdentifiedEntity {
  name: string;
  counterparty: CounterpartyModel;
  address?: AddressModel;
  shopTypes?: ShopTypeModel[];
  salesChannels?: SalesChannelModel[];
  shopDeparts?: ShopDepartModel[];
  shopSpecializations?: ShopSpecializationModel[];
}



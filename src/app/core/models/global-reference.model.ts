import {IdentifiedEntity} from "./identified.entity";

export class BaseIdentifiedEntity extends IdentifiedEntity {
  version?: number;
  active?: boolean;

  constructor(id: number, version: number, active: boolean) {
    super(id);
    this.version = version;
    this.active = active;
  }
}

export class ShopClassifier extends BaseIdentifiedEntity {
  name?: string;
  manufacturer?: ManufacturerModel;

  constructor(id: number, version: number, active: boolean, name: string, manufacturer: ManufacturerModel) {
    super(id, version, active);
    this.name = name;
    this.manufacturer = manufacturer;
  }
}

export class EnumerationEntity extends IdentifiedEntity {
  name?: string;
  ident?: string;
  properties?: any;

  constructor(id: number, name: string, ident: string, properties: any) {
    super(id);
    this.name = name;
    this.ident = ident;
    this.properties = properties;
  }
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

export class ManufacturerModel extends BaseIdentifiedEntity {
  name?: string;

  constructor(id: number, version: number, active: boolean, name: string) {
    super(id, version, active);
    this.name = name;
  }
}

export interface CounterpartyProperties {
  opfType: string;
  opfShort: string;
  opfFull: string;
  opfCode: string;
}

export interface LegalType {
  id: number;
  name: string;
  ident: string;
  properties: CounterpartyProperties;
}

export interface LegalRekv {
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

export interface PaymentDetails {
  id: number;
  version: number;
  active: boolean;
  paymentAccount: string;
  correspondingAccount: string;
  bic: string;
  bank: string;
}

export interface CounterpartyStatus {
  id: number;
  name: string;
  ident: string;
  properties?: any;
}

export class DocType extends EnumerationEntity {

  constructor(id: number, name: string, ident: string, properties: any) {
    super(id, name, ident, properties);
  }
}

export class Citizenship extends EnumerationEntity {

  constructor(id: number, name: string, ident: string, properties: any) {
    super(id, name, ident, properties);
  }
}

export class Gender extends EnumerationEntity {

  constructor(id: number, name: string, ident: string, properties: any) {
    super(id, name, ident, properties);
  }
}

export interface PersonRekv extends BaseIdentifiedEntity {
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

export interface Owner extends BaseIdentifiedEntity {
  name: string;
}

export interface CounterpartyModel extends BaseIdentifiedEntity {
  name: string;
  legalType: LegalType;
  legalRekv: LegalRekv;
  paymentDetails: PaymentDetails;
  suggestion?: any;
  parent?: any;
  statuses: CounterpartyStatus[];
  personRekv: PersonRekv;
  owner: Owner;
}


export class Contract extends BaseIdentifiedEntity {

  constructor(id: number, version: number, active: boolean) {
    super(id, version, active);
  }
}

export class ShopSpecializationModel extends ShopClassifier {

  constructor(id: number, version: number, active: boolean, name: string, manufacturer: ManufacturerModel) {
    super(id, version, active, name, manufacturer);
  }
}

export class ShopTypeModel extends ShopClassifier {

  constructor(id: number, version: number, active: boolean, name: string, manufacturer: ManufacturerModel) {
    super(id, version, active, name, manufacturer);
  }
}

export class SalesChannelModel extends ShopClassifier {


  constructor(id: number, version: number, active: boolean, name: string, manufacturer: ManufacturerModel) {
    super(id, version, active, name, manufacturer);
  }
}

export class ShopDepartModel extends ShopClassifier {


  constructor(id: number, version: number, active: boolean, name: string, manufacturer: ManufacturerModel) {
    super(id, version, active, name, manufacturer);
  }
}


export interface ShopModel extends BaseIdentifiedEntity {
  name: string;
  address: AddressModel;
  shopTypes: ShopTypeModel[];
  salesChannels: SalesChannelModel[];
  counterparty: CounterpartyModel;
}



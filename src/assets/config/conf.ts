export class Conf {

  // General urls
  private _BASE_URL = 'http://84.201.159.119:8112/spocr';
  private _AUTH_URL = '/auth/signin';

  private _APP_SETTINGS_URL = '/api/app/settings';

  // Shop entity urls
  private _SHOP_URL = '/api/shops';
  private _SALES_CHANNELS_URL = '/api/saleschannels';
  private _SHOP_DEPARTS_URL = '/api/shopdeparts';
  private _SHOP_SPECIALIZATION_URL = '/api/shopspecializations';
  private _SHOP_TYPES_URL = '/api/shoptypes';

  // Manufacturer urls
  private _MANUFACTURES_URL = '/api/manufactures';

  // Counterparty urls
  private _COUNTERPARTIES_URL = '/api/counterparties';
  private _CP_STATUSES_URL = '/api/enumerations?ident=CP-STATUS';

  //Personal requisites URLS
  private _DOC_TYPES_URL = '/api/enumerations?ident=DOC-TYPE';
  private _CITIZENSHIP_URL = '/api/enumerations?ident=CITIZENSHIP';
  private _GENDER_URL = '/api/enumerations?ident=GENDER';

  get GENDER_URL(): string {
    return this._GENDER_URL;
  }
  private _CONTRACTS_URL = '/api/contracts';

  get CP_STATUSES_URL(): string {
    return this._CP_STATUSES_URL;
  }

  get DOC_TYPES_URL(): string {
    return this._DOC_TYPES_URL;
  }

  get CITIZENSHIP_URL(): string {
    return this._CITIZENSHIP_URL;
  }

  get SALES_CHANNELS_URL(): string {
    return this._SALES_CHANNELS_URL;
  }

  get SHOP_DEPARTS_URL(): string {
    return this._SHOP_DEPARTS_URL;
  }

  get SHOP_SPECIALIZATION_URL(): string {
    return this._SHOP_SPECIALIZATION_URL;
  }

  get BASE_URL(): string {
    return this._BASE_URL;
  }

  get AUTH_URL(): string {
    return this._AUTH_URL;
  }

  get SHOP_URL(): string {
    return this._SHOP_URL;
  }

  get COUNTERPARTIES_URL(): string {
    return this._COUNTERPARTIES_URL;
  }

  get MANUFACTURES_URL(): string {
    return this._MANUFACTURES_URL;
  }

  get SHOP_TYPES_URL(): string {
    return this._SHOP_TYPES_URL;
  }

  get APP_SETTINGS_URL(): string {
    return this._APP_SETTINGS_URL;
  }

  get CONTRACTS_URL(): string {
    return this._CONTRACTS_URL;
  }
}

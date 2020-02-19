export class Conf {
  private _BASE_URL = 'http://84.201.159.119:8112/spocr';
  private _AUTH_URL = '/auth/signin';
  private _SHOP_URL = '/api/shops';
  private _COUNTERPARTIES_URL = '/api/counterparties';
  private _MANUFACTURES_URL = '/api/manufactures';
  private _SHOP_TYPES_URL = '/api/shoptypes';
  private _SALES_CHANNELS_URL = '/api/saleschannels';
  private _SHOP_DEPARTS_URL = '/api/shopdeparts';
  private _SHOP_SPECIALIZATION_URL = '/api/shopspecializations';


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
}

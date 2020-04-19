export class Conf {

  // General urls
  private _BASE_URL = 'http://84.201.159.119:8112/spocr';
  private _AUTH_URL = '/auth/signin';

  // App settings urls
  private _APP_SETTINGS_URL = '/api/app/settings';

  // Counterparty urls
  private _CP_STATUSES_URL = '/api/enumerations?ident=CP-STATUS';
  private _LEGAL_TYPES_URL = '/api/enumerations?ident=LEGAL-TYPE';

  //Personal requisites URLS
  private _DOC_TYPES_URL = '/api/enumerations?ident=DOC-TYPE';
  private _CITIZENSHIP_URL = '/api/enumerations?ident=CITIZENSHIP';
  private _GENDER_URL = '/api/enumerations?ident=GENDER';
  private _CONTRACT_TYPE_URL = '/api/enumerations?ident=CONTRACT-TYPE';
  private _CONTRACT_STATUS_URL = '/api/enumerations?ident=CONTRACT-STATUS';

  get LEGAL_TYPES_URL(): string {
    return this._LEGAL_TYPES_URL;
  }

  get GENDER_URL(): string {
    return this._GENDER_URL;
  }

  get CP_STATUSES_URL(): string {
    return this._CP_STATUSES_URL;
  }

  get DOC_TYPES_URL(): string {
    return this._DOC_TYPES_URL;
  }

  get CITIZENSHIP_URL(): string {
    return this._CITIZENSHIP_URL;
  }

  get BASE_URL(): string {
    return this._BASE_URL;
  }

  get AUTH_URL(): string {
    return this._AUTH_URL;
  }

  get APP_SETTINGS_URL(): string {
    return this._APP_SETTINGS_URL;
  }

  get CONTRACT_TYPE_URL(): string {
    return this._CONTRACT_TYPE_URL;
  }

  get CONTRACT_STATUS_URL(): string {
    return this._CONTRACT_STATUS_URL;
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';
import {Observable} from 'rxjs';
import {map, publishReplay, refCount} from 'rxjs/operators';
import {CalendarConfig, DateTimeConfig} from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configSettings = new Conf();
  private shopUrl: string = this.configSettings.BASE_URL + this.configSettings.APP_SETTINGS_URL;
  private appConfigs: Observable<object>;
  private dateTimeConfig: DateTimeConfig;
  private calendarConfig: CalendarConfig;

  constructor(private http: HttpClient) {
  }

  getDateTimeConfig(): DateTimeConfig {
    return this.dateTimeConfig;
  }

  getCalendarConfig(): CalendarConfig {
    return this.calendarConfig;
  }

  fetchAppSettings() {
    if (!this.appConfigs) {
      this.appConfigs = this.http.get(this.shopUrl).pipe(
        publishReplay(1),
        refCount(),
      );

      this.fetchDateTimeConfig()
        .subscribe((dateTimeConfig) => {
          this.dateTimeConfig = dateTimeConfig;
        });

      this.fetchCalendarConfig()
        .subscribe((calendarConfig: CalendarConfig) => {
          this.calendarConfig = calendarConfig;

        });
    }

    return this.appConfigs;
  }

  /**
   *
   * @param dataType тип таблицы может быть (1,2,3,4,5,6,7) одно из значений {@link AppTableTypes}
   */
  fetchAppSettingsByType(dataType: number) {
    return this.fetchAppSettings().pipe(
      map((data: any) => {
        const resObj = data.availableTables.find(o => o.id === dataType);
        return {
          dataType: resObj.id,
          tableTitle: resObj.name,
        };
      }),
    );
  }

  /**
   *
   * Возвращает с сервера конфигуращию всех таблиц с сервера,
   * затем вытаскивает конфигурацию заголовков таблицы по заданному
   * параметру
   *
   * @param dataType тип таблицы может быть (1,2,3,4,5,6,7) одно из значений {@link AppTableTypes}
   */
  fetchTableHeader(dataType: number) {
    return this.fetchAppSettings().pipe(
      map((data: any) => {
        const resObj = data.availableTables.find(o => o.id === dataType);
        return {
          key: resObj.key,
          columns: [...resObj.columns],
          sortField: resObj.sortField,
          sortOrder: resObj.sortOrder,
        };
      }),
    );
  }

  clearCache() {
    this.appConfigs = null;
  }

  fetchDataTypeEndpointURL(dataType: number) {
    return this.fetchAppSettings().pipe(
      map((data: any) => {
        const resObj = data.availableTables.find(o => o.id === dataType);
        return {
          url: `${this.configSettings.BASE_URL}/api${resObj.url}`,
        };
      }),
    );
  }

  fetchDaDataConfiguration() {
    return this.fetchAppSettings().pipe(
      map((data: any) => {
        return data.daDataConfiguration.apiKey;
      }),
    );
  }

  fetchDateTimeConfig(): Observable<DateTimeConfig> {
    return this.fetchAppSettings().pipe(
      map((data: any) => {
        return data.dateTimeConfig;
      }),
    );
  }

  fetchCalendarConfig(): Observable<CalendarConfig> {
    return this.fetchAppSettings().pipe(
      map((data: any) => {
        return data.calendarConfiguration;
      }),
    );
  }
}

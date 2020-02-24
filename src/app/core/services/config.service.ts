import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conf} from '../../../assets/config/conf';
import {Observable} from "rxjs";
import {map, publishReplay, refCount} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configSettings = new Conf();
  private shopUrl: string = this.configSettings.BASE_URL + this.configSettings.APP_SETTINGS_URL;
  private appConfigs: Observable<Object>;

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  fetchAppSettings() {
    if (!this.appConfigs) {
      this.appConfigs = this.http.get(this.shopUrl).pipe(
        publishReplay(1),
        refCount(),
      );
    }

    return this.appConfigs;
  }

  fetchAppSettingsByType(dataType: number = 1) {
    return this.fetchAppSettings().pipe(
      map((data: any) => {
        let resObj = data.availableTables.find(o => o.id === dataType);
        return {
          dataType: resObj.id,
          tableTitle: resObj.name,
        };
      }),
    );
  }

  fetchTableHeader(dataType: number = 1) {
    return this.fetchAppSettings().pipe(
      map((data: any) => {
        let resObj = data.availableTables.find(o => o.id === dataType);
        return {
          columns: [... resObj.columns],
          sortField: resObj.sortField,
          sortOrder: resObj.sortOrder,
        };
      }),
    );
  }

  clearCache() {
    this.appConfigs = null;
  }
}

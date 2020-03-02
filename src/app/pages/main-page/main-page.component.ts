import {Component, OnInit, ViewChildren, QueryList} from '@angular/core';
import {ConfigService} from '../../core/services/config.service';
import {AppTableTypes} from '../../core/models/app-tabe-types.enum';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private _searchString: string;
  private _tableTitle: string;
  private _dataType: AppTableTypes;

  @ViewChildren('appDataTable') appDataTable: QueryList<any>;

  constructor(
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.setConfiguration(AppTableTypes.SHOP_TABLE_TYPE);
  }

  get searchString(): string {
    return this._searchString;
  }

  set searchString(searchString: string) {
    this._searchString = searchString;
  }

  get tableTitle(): string {
    return this._tableTitle;
  }

  set tableTitle(tableTitle: string) {
    this._tableTitle = tableTitle;
  }

  get dataType(): AppTableTypes {
    return this._dataType;
  }

  set dataType(value: AppTableTypes) {
    this._dataType = value;
  }

  clearSearch(): void {
    this.searchString = '';
    this.appDataTable
      .toArray()
      .forEach((tableComp) => tableComp.loadTableData());
  }

  onSearched(tableSearch: HTMLInputElement): void {
    this.appDataTable
      .toArray()
      .forEach((tableComp) => tableComp.dataSearch(tableSearch.value));
  }

  setConfiguration(dataType: number): void {
    this.configService
      .fetchAppSettingsByType(dataType)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }

  shopsToggle() {
    this.configService
      .fetchAppSettingsByType(AppTableTypes.SHOP_TABLE_TYPE)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }

  counterPartiesToggle() {
    this.configService
      .fetchAppSettingsByType(AppTableTypes.COUNTER_PARTIES_TABLE_TYPE)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }

  manufactireToggle() {
    this.configService
      .fetchAppSettingsByType(AppTableTypes.MANUFACTURE_TABLE_TYPE)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }

  shopTypesToggle() {
    this.configService
      .fetchAppSettingsByType(AppTableTypes.SHOP_TYPES_TABLE_TYPE)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }
}

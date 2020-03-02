import {Component, ViewChild, OnInit} from '@angular/core';
import {ShopDataTableComponent} from './components/shop-data-table/shop-data-table.component';
import {CounterpartiesDataTableComponent} from './components/counterparties-data-table/counterparties-data-table.component';
import {ManufactureDataTableComponent} from './components/manufacture-data-table/manufacture-data-table.component';
import {ShopTypesDataTableComponent} from './components/shop-types-data-table/shop-types-data-table.component';

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
  private uiTables: Object;

  @ViewChild('shopDataTable')
  shopDataTable: ShopDataTableComponent;
  @ViewChild('counterPartiesDataTable')
  counterPartiesDataTable: CounterpartiesDataTableComponent;
  @ViewChild('manufactureDataTable')
  manufactureDataTable: ManufactureDataTableComponent;
  @ViewChild('shopTypesDataTable')
  shopTypesDataTable: ShopTypesDataTableComponent;

  constructor(
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.setConfiguration(AppTableTypes.SHOP_TABLE_TYPE);
  }

  initVewTable() {
    this.uiTables = {
      [AppTableTypes.SHOP_TABLE_TYPE]: this.shopDataTable,
      [AppTableTypes.COUNTER_PARTIES_TABLE_TYPE]: this.counterPartiesDataTable,
      [AppTableTypes.MANUFACTURE_TABLE_TYPE]: this.manufactureDataTable,
      [AppTableTypes.SHOP_TYPES_TABLE_TYPE]: this.shopTypesDataTable
    };
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
    this.uiTables[this.dataType]
      .loadTableData();
  }

  onSearched(tableSearch: HTMLInputElement): void {
    this.uiTables[this.dataType]
      .dataSearch(tableSearch.value);
  }

  setConfiguration(dataType: number): void {
    this.configService
      .fetchAppSettingsByType(dataType)
      .subscribe((data) => {
        Object.assign(this, data);
        setTimeout(() => {
          this.initVewTable();
        }, 500);
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

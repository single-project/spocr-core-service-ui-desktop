import {Component, ViewChild, OnInit} from '@angular/core';
import {ShopDataTableComponent} from './components/shop-data-table/shop-data-table.component';
import {CounterpartiesDataTableComponent} from './components/counterparties-data-table/counterparties-data-table.component';
import {ManufactureDataTableComponent} from './components/manufacture-data-table/manufacture-data-table.component';
import {ShopTypesDataTableComponent} from './components/shop-types-data-table/shop-types-data-table.component';

import {ConfigService} from '../../core/services/config.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private _searchString: string;
  private _tableTitle: string;
  private _dataType: number;
  private uiTables: Object;

  @ViewChild('shopDataTable', {static: false})
  shopDataTable: ShopDataTableComponent;
  @ViewChild('counterPartiesDataTable', {static: false})
  counterPartiesDataTable: CounterpartiesDataTableComponent;
  @ViewChild('manufactureDataTable', {static: false})
  manufactureDataTable: ManufactureDataTableComponent;
  @ViewChild('shopTypesDataTable', {static: false})
  shopTypesDataTable: ShopTypesDataTableComponent;

  constructor(
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.setConfiguration();
  }

  initVewTable() {
    this.uiTables = {
      [tableTypes.SHOP_TABLE_TYPE]: this.shopDataTable,
      [tableTypes.COUNTER_PARTIES_TABLE_TYPE]: this.counterPartiesDataTable,
      [tableTypes.MANUFACTURE_TABLE_TYPE]: this.manufactureDataTable,
      [tableTypes.SHOP_TYPES_TABLE_TYPE]: this.shopTypesDataTable
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

  get dataType(): number {
    return this._dataType;
  }

  set dataType(dataType: number) {
    this._dataType = dataType;
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

  setConfiguration(): void {
    this.configService
      .fetchAppSettingsByType()
      .subscribe((data) => {
        Object.assign(this, data);
        setTimeout(() => {
          this.initVewTable();
        }, 500);
      });
  }

  shopsToggle() {
    this.configService
      .fetchAppSettingsByType(tableTypes.SHOP_TABLE_TYPE)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }

  counterPartiesToggle() {
    this.configService
      .fetchAppSettingsByType(tableTypes.COUNTER_PARTIES_TABLE_TYPE)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }

  manufactireToggle() {
    this.configService
      .fetchAppSettingsByType(tableTypes.MANUFACTURE_TABLE_TYPE)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }

  shopTypesToggle() {
    this.configService
      .fetchAppSettingsByType(tableTypes.SHOP_TYPES_TABLE_TYPE)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }
}

enum tableTypes {
  SHOP_TABLE_TYPE = 1,
  COUNTER_PARTIES_TABLE_TYPE,
  MANUFACTURE_TABLE_TYPE,
  SHOP_TYPES_TABLE_TYPE
}

import {Component, Inject, ViewChild, OnInit} from '@angular/core';
import {ShopDataTableComponent} from "./components/shop-data-table/shop-data-table.component";
import {CounterpartiesDataTableComponent} from "./components/counterparties-data-table/counterparties-data-table.component";
import {ManufactureDataTableComponent} from "./components/manufacture-data-table/manufacture-data-table.component";
import {ShopTypesDataTableComponent} from "./components/shop-types-data-table/shop-types-data-table.component";

import {ConfigService} from "../../core/services/config.service";
import {DadataService} from "../../core/services/dadata.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private searchString: string;
  private tableTitle: string;
  private dataType: number;
  private userId: number;
  private tableTypes: any;

  @ViewChild('shopDataTable', {static: false})
  shopDataTable: ShopDataTableComponent;
  @ViewChild('counterPartiesDataTable', {static: false})
  counterPartiesDataTable: CounterpartiesDataTableComponent;
  @ViewChild('manufactureDataTable', {static: false})
  manufactureDataTable: ManufactureDataTableComponent;
  @ViewChild('shopTypesDataTable', {static: false})
  shopTypesDataTable: ShopTypesDataTableComponent;

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.setConfiguration();
  }

  clearSearch(): void {
    this.searchString = '';
    if (this.dataType === 1) {
      this.shopDataTable.loadShopsData();
    } else if (this.dataType === 2) {
      this.counterPartiesDataTable.loadCounterPartiesData();
    } else if (this.dataType === 3) {
      this.manufactureDataTable.loadManufactureData();
    } else if (this.dataType === 4) {
      this.shopTypesDataTable.loadShopTypesData();
    }
  }

  onSearched(tableSearch: HTMLInputElement): void {
    if (this.dataType === 1) {
      this.shopDataTable.dataSearch(tableSearch.value);
    } else if (this.dataType === 2) {
      this.counterPartiesDataTable.dataSearch(tableSearch.value);
    } else if (this.dataType === 3) {
      this.manufactureDataTable.dataSearch(tableSearch.value);
    } else if (this.dataType === 4) {
      this.shopTypesDataTable.dataSearch(tableSearch.value);
    }
  }

  setConfiguration(): void {

    this.tableTypes = {
      SHOP_TABLE_TYPE: {
        userId: 1,
        tableTitle: 'Торговые точки',
        dataType: 1,
        activeChecked:false,
        nonActiveChecked: false
      },
      COUNTER_PARTIES_TABLE_TYPE: {
        userId: 1,
        tableTitle: 'Контрагенты',
        dataType: 2,
        activeChecked:false,
        nonActiveChecked: false
      },
      MANUFACTURE_TABLE_TYPE: {
        userId: 1,
        tableTitle: 'Производители',
        dataType: 3,
        activeChecked:false,
        nonActiveChecked: false
      },
      SHOP_TYPES_TABLE_TYPE: {
        userId: 1,
        tableTitle: 'Типы ТТ',
        dataType: 4,
        activeChecked:false,
        nonActiveChecked: false
      },
    };

    this.configService
      .fetchAppSettings()
      .subscribe((data) => {
        Object.assign(this, this.tableTypes.SHOP_TABLE_TYPE);
        console.log('');
    });
  }

  shopsToggle() {
    Object.assign(this, this.tableTypes.SHOP_TABLE_TYPE);
  }

  counterPartiesToggle() {
    Object.assign(this, this.tableTypes.COUNTER_PARTIES_TABLE_TYPE);
  }

  manufactireToggle() {
    Object.assign(this, this.tableTypes.MANUFACTURE_TABLE_TYPE);
  }

  shopTypesToggle() {
    Object.assign(this, this.tableTypes.SHOP_TYPES_TABLE_TYPE);
  }
}

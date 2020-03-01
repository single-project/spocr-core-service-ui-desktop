import {Component, OnInit, ViewChild} from '@angular/core';

import {ShopsService} from '../../../../core/services/shops.service';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {LazyLoadEvent, MessageService} from 'primeng';
import {SearchService} from '../../../../core/services/search.service';
import {ConfigService} from '../../../../core/services/config.service';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ShopModel} from '../../../../core/models/global-reference.model';
import {ShopDialogComponent} from '../shop-dialog/shop-dialog.component';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';

@Component({
  selector: 'app-shop-data-table',
  templateUrl: './shop-data-table.component.html',
  styleUrls: ['./shop-data-table.component.scss']
})
export class ShopDataTableComponent extends AppDataTableModel implements OnInit {
  selectedShop: ShopModel;

  @ViewChild('shopDialogComponent', {static: false})
  shopDialogComponent: ShopDialogComponent;

  constructor(
    shopService: ShopsService,
    private search: SearchService,
    private counterPartiesService: CounterpartiesService,
    private shopTypesService: ShopTypesService,
    private mService: MessageService,
    configService: ConfigService,
  ) {
    super(
      configService,
      shopService);
  }

  ngOnInit() {
    this.loading = true;
    this.loadShopsTableHeaders(AppTableTypes.SHOP_TABLE_TYPE);
    this.initColumnFilter(() => {
      return []
    });
  }

  fetchFilterData(params = {}, fieldName = '') {
    let dataService$ = this.tableDataService.fetchData(params);

    if (fieldName === 'counterparty') {
      dataService$ = this.counterPartiesService
        .fetchCounterPartiesData(params);
    }
    return dataService$;
  }

  onRowSelect() {
    this.shopDialogComponent._display = true;
  }

  onShopCreate() {
    this.shopDialogComponent._display = true;
  }

  columnsChange() {
    console.dir(this.selectedCols);
  }

  showServerErrorToast() {
    this.mService.clear();
    this.mService.add({
      key: 'c',
      sticky: true,
      severity: 'error',
      summary: 'Что-то пошло не так. Попробуйте сохранить позже',
      detail: 'Данные не сохранены'
    });
  }

  showSuccessSavingMessage() {
    this.mService.clear();
    this.mService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Данные успешно сохранены'
    });
  }

  shopSavedFromDialog(e: ShopModel): void {
    let idx = this.dataItems.findIndex((i: any) => i.id === e.id);
    console.log('IDX' + idx);
    if (idx !== -1) {
      this.dataItems[idx] = {...e};
      this.showSuccessSavingMessage()
    } else {
      this.dataItems = [...this.dataItems, e];
    }
  }
}

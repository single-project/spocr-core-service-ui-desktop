import {Component, OnInit, ViewChild} from '@angular/core';

import {ShopsService} from '../../../../core/services/shops.service';
import {DialogService, MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ShopModel} from '../../../../core/models/global-reference.model';
import {ShopDialogComponent} from '../shop-dialog/shop-dialog.component';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shop-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['./shop-data-table.component.scss']
})
export class ShopDataTableComponent extends AppDataTableModel<ShopModel> implements OnInit {

  @ViewChild('shopDialogComponent', {static: false})
  shopDialogComponent: ShopDialogComponent;

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    shopService: ShopsService,
    dialogService: DialogService,
  ) {
    super(
      messageService,
      configService,
      shopService,
      dialogService,
      ShopDialogComponent);
  }

  ngOnInit() {
    this.loading = true;
    this.loadTableHeaders(AppTableTypes.SHOP_TABLE_TYPE);
    this.initColumnFilter(() => {
      return []
    });
  }

  fetchFilterData(params: Object, fieldName: string): Observable<any> {
    return this.tableDataService.get(params);
  }

  onRowSelect() {
    this.onItemCreate(this.selectedItem);
  }

  /**
   * Открывает динамическое диалоговое окно
   * [Dynamic Dialog](https://www.primefaces.org/primeng/showcase/#/dynamicdialog)
   * @param shop
   */
  onItemCreate(shop?) {
    let header = shop ? shop.name : 'Новый Контрагент1';
    const ref = this.dialogService.open(this.dialogComponentType, {
      data: {entity: shop, entityKey: 'shop'},
      header: header,
      width: '70%',
    });

    ref.onClose.subscribe((e: boolean) => {
      if (e) {
        console.log("need to refresh page");
      } else {
        console.log("no need to refresh page");
      }
    });
  }
}

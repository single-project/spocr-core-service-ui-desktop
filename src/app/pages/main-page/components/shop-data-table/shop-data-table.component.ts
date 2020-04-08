import {Component, OnInit} from '@angular/core';

import {ShopsService} from '../../../../core/services/shops.service';
import {DialogService, MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ShopModel} from '../../../../core/models/global-reference.model';
import {ShopDialogComponent} from '../shop-dialog/shop-dialog.component';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';

@Component({
  selector: 'app-shop-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class ShopDataTableComponent extends AppDataTableModel<ShopModel> implements OnInit {

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
    this.оnInit(
      AppTableTypes.SHOP_TABLE_TYPE);
  }
}

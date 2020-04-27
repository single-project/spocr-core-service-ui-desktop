import {Component, OnInit} from '@angular/core';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {DialogService, MessageService} from 'primeng';

import {ShopTypeModel} from '../../../../core/models/global-reference.model';
import {ShopTypeDialogComponent} from '../shop-type-dialog/shop-type-dialog.component';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {ConfigService} from '../../../../core/services/config.service';

@Component({
  selector: 'app-shop-types-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class ShopTypesDataTableComponent extends AppDataTableModel<ShopTypeModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    dialogService: DialogService,
    shopTypesService: ShopTypesService,
  ) {
    super(
      messageService,
      configService,
      shopTypesService,
      dialogService,
      ShopTypeDialogComponent);
  }

  ngOnInit(): void {
    this.entityKey = "shop-type";
    this.onInit(
      AppTableTypes.SHOP_TYPES_TABLE_TYPE);
  }
}

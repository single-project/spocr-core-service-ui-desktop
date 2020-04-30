import {Component, OnInit} from '@angular/core';
import { DialogService, MessageService } from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ShopSpecializationsService} from '../../../../core/services/shop-specializations.service';
import {ShopSpecializationModel} from 'src/app/core/models/global-reference.model';
import { ShopSpecializationDialogComponent } from '../shop-specialization-dialog/shop-specialization-dialog.component';

@Component({
  selector: 'app-shop-specializations-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class ShopSpecializationsDataTableComponent extends AppDataTableModel<ShopSpecializationModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    shopspecializationsService: ShopSpecializationsService,
    dialogService: DialogService) {
    super(messageService,
      configService,
      shopspecializationsService,
      dialogService,
      ShopSpecializationDialogComponent);
  }

  ngOnInit(): void {
    this.entityKey = 'shop-specialization';
    this.onInit(
      AppTableTypes.SHOP_SPECIALIZATIONS_TABLE_TYPE);
  }
}

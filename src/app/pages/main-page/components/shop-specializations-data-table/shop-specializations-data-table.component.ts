import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ShopSpecializationsService} from '../../../../core/services/shop-specializations.service';
import {ShopSpecializationModel} from 'src/app/core/models/global-reference.model';

@Component({
  selector: 'app-shop-specializations-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class ShopSpecializationsDataTableComponent extends AppDataTableModel<ShopSpecializationModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    shopspecializationsService: ShopSpecializationsService) {
    super(messageService,
      configService,
      shopspecializationsService);
  }

  ngOnInit(): void {
    this.оnInit(
      AppTableTypes.SHOP_SPECIALIZATIONS_TABLE_TYPE);
  }
}

import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {Observable} from 'rxjs';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ShopSpecializationsService} from '../../../../core/services/shop-specializations.service';
import {ShopSpecializationModel} from 'src/app/core/models/global-reference.model';

@Component({
  selector: 'app-shop-specializations-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['./shop-specializations-data-table.component.scss']
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
    this.loading = true;
    this.loadTableHeaders(
      AppTableTypes.SHOP_SPECIALIZATIONS_TABLE_TYPE);
    this.initColumnFilter(() => {
      return []
    });
  }

  fetchFilterData(params: Object, fieldName: string): Observable<any> {
    return this.tableDataService.get(params);
  }
}

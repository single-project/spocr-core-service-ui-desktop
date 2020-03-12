import {Component, OnInit} from '@angular/core';
import {ShopDepartsService} from '../../../../core/services/shop-departs.service';
import {ConfigService} from '../../../../core/services/config.service';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {Observable} from 'rxjs';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {MessageService} from 'primeng';
import {IdentifiedEntity} from '../../../../core/models/identified.entity';

@Component({
  selector: 'app-shop-departments-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['./shop-departments-data-table.component.scss'],
})
export class ShopDepartmentsDataTableComponent extends AppDataTableModel<IdentifiedEntity> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    shopDepartsService: ShopDepartsService) {
    super(messageService,
      configService,
      shopDepartsService);
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadTableHeaders(
      AppTableTypes.SHOP_DEPARTMENTS_TABLE_TYPE);
    this.initColumnFilter(() => {
      return []
    });
  }

  fetchFilterData(params: Object, fieldName: string): Observable<any> {
    return this.tableDataService.get(params);
  }
}

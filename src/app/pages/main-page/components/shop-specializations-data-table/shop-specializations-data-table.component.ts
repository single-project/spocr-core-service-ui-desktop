import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {Observable} from 'rxjs';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ShopspecializationsService} from '../../../../core/services/shopspecializations.service';

@Component({
  selector: 'app-shop-specializations-data-table',
  templateUrl: './shop-specializations-data-table.component.html',
  styleUrls: ['./shop-specializations-data-table.component.scss']
})
export class ShopSpecializationsDataTableComponent extends AppDataTableModel implements OnInit {

  selectedItem: any;

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    shopspecializationsService: ShopspecializationsService) {
    super(messageService,
      configService,
      shopspecializationsService);
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadShopsTableHeaders(
      AppTableTypes.SHOP_SPECIALIZATIONS_TABLE_TYPE);
    this.initColumnFilter(() => {
      return []
    });
  }

  fetchFilterData(params: Object, fieldName: string): Observable<any> {
    return this.tableDataService.fetchData(params);
  }
}

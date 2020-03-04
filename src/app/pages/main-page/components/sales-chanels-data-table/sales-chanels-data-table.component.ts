import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {Observable} from 'rxjs';
import {SaleschannelsService} from '../../../../core/services/saleschannels.service';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';

@Component({
  selector: 'app-sales-chanels-data-table',
  templateUrl: './sales-chanels-data-table.component.html',
  styleUrls: ['./sales-chanels-data-table.component.scss']
})
export class SalesChanelsDataTableComponent extends AppDataTableModel implements OnInit {

  selectedItem: any;

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    saleschannelsService: SaleschannelsService) {
    super(messageService,
      configService,
      saleschannelsService);
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadShopsTableHeaders(
      AppTableTypes.SALES_CHANELS_TABLE_TYPE);
    this.initColumnFilter(() => {
      return []
    });
  }

  fetchFilterData(params: Object, fieldName: string): Observable<any> {
    return this.tableDataService.fetchData(params);
  }

}

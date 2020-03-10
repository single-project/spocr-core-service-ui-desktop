import {Component, Injector, OnInit} from '@angular/core';
import {MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {Observable} from 'rxjs';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ContractService} from '../../../../core/services/contract.service';
import {IdentifiedEntity} from "../../../../core/models/identified.entity";
import {ContractModel} from 'src/app/core/models/global-reference.model';

@Component({
  selector: 'app-contracts-data-table',
  templateUrl: './contracts-data-table.component.html',
  styleUrls: ['./contracts-data-table.component.scss']
})
export class ContractsDataTableComponent extends AppDataTableModel<ContractModel> implements OnInit {

  selectedItem: any;

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    contractService: ContractService) {
    super(messageService,
      configService,
      contractService);
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadShopsTableHeaders(
      AppTableTypes.CONTRACTS_TABLE_TYPE);
    this.initColumnFilter(() => {
      return []
    });
  }

  fetchFilterData(params: Object, fieldName: string): Observable<any> {
    return this.tableDataService.get(params);
  }

}

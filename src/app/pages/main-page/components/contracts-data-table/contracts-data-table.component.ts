import {Component, OnInit} from '@angular/core';
import {DialogService, MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ContractService} from '../../../../core/services/contract.service';
import {ContractModel} from 'src/app/core/models/global-reference.model';
import {ContractDialogComponent} from "../contract-dialog/contract-dialog.component";

@Component({
  selector: 'app-contracts-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['./contracts-data-table.component.scss']
})
export class ContractsDataTableComponent extends AppDataTableModel<ContractModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    contractService: ContractService,
    dialogService: DialogService) {
    super(messageService,
      configService,
      contractService,
      dialogService,
      ContractDialogComponent);
  }

  ngOnInit(): void {
    this.оnInit(
      AppTableTypes.CONTRACTS_TABLE_TYPE);
  }
}

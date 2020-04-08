import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ContractService} from '../../../../core/services/contract.service';
import {ContractModel} from 'src/app/core/models/global-reference.model';

@Component({
  selector: 'app-contracts-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class ContractsDataTableComponent extends AppDataTableModel<ContractModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    contractService: ContractService) {
    super(messageService,
      configService,
      contractService);
  }

  ngOnInit(): void {
    this.оnInit(
      AppTableTypes.CONTRACTS_TABLE_TYPE);
  }
}

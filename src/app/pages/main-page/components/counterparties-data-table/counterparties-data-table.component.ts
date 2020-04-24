import {Component, OnInit} from '@angular/core';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {DialogService, MessageService} from 'primeng';
import {CounterpartyDialogComponent} from '../counterparty-dialog/counterparty-dialog.component';
import {CounterpartyModel} from '../../../../core/models/global-reference.model';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';

@Component({
  selector: 'app-counterparties-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class CounterpartiesDataTableComponent extends AppDataTableModel<CounterpartyModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    dialogService: DialogService,
    counterpartiesService: CounterpartiesService
  ) {
    super(
      messageService,
      configService,
      counterpartiesService,
      dialogService,
      CounterpartyDialogComponent);
  }

  ngOnInit(): void {
    this.entityKey = "counterparty";
    this.оnInit(
      AppTableTypes.COUNTER_PARTIES_TABLE_TYPE);
  }
}


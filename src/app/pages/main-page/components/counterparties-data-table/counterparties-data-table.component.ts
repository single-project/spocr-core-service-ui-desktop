import {Component, OnInit} from '@angular/core';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {DialogService, MessageService} from 'primeng';
import {CounterpartyDialogComponent} from '../counterparty-dialog/counterparty-dialog.component';
import {CounterpartyModel} from '../../../../core/models/global-reference.model';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-counterparties-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['./counterparties-data-table.component.scss']
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
    this.loading = true;
    this.loadTableHeaders(
      AppTableTypes.COUNTER_PARTIES_TABLE_TYPE);
    this.initColumnFilter(() => {
      return []
    });
  }

  fetchFilterData(params: Object, fieldName: string): Observable<any> {
    return this.tableDataService.get(params);
  }

  onRowSelect() {
    this.onItemCreate(this.selectedItem);
  }

  /**
   *
   * Открывает динамическое диалоговое окно
   * [Dynamic Dialog](https://www.primefaces.org/primeng/showcase/#/dynamicdialog)
   *
   * @param counterparty
   */
  onItemCreate(counterparty?) {
    let header = counterparty ? counterparty.name : 'Новый Контрагент';
    const ref = this.dialogService.open(this.dialogComponentType, {
      data: {entity: counterparty, entityKey: 'counterparty'},
      header: header,
      width: '70%',
      closeOnEscape: true,
    });

    ref.onClose.subscribe((e: boolean) => {
      if (e) {
        console.log("need to refresh page");
      } else {
        console.log("no need to refresh page");
      }
    });
  }
}


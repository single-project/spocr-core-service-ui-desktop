import {Component, OnInit} from '@angular/core';
import {EntityCardModel} from '../../../../core/models/entity-card.model';
import {ContractModel} from '../../../../core/models/global-reference.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng';
import {MessageServiceFacadeService} from '../../../../core/services/message-service-facade.service';
import {ContractService} from '../../../../core/services/contract.service';
import moment from 'moment-timezone';
import {ConfigService} from "../../../../core/services/config.service";

@Component({
  selector: 'app-contracts-dialog',
  templateUrl: './contracts-dialog.component.html',
  styleUrls: ['./contracts-dialog.component.scss']
})
export class ContractsDialogComponent extends EntityCardModel<ContractModel> implements OnInit {

  static tz: string;

  constructor(
    configService: ConfigService,
    formBuilder: FormBuilder,
    dialogRef: DynamicDialogRef,
    dialogConfig: DynamicDialogConfig,
    contractService: ContractService,
    messageService: MessageServiceFacadeService,
  ) {
    super(
      formBuilder,
      dialogRef,
      dialogConfig,
      contractService,
      messageService,
      configService
    )
  }

  ngOnInit(): void {
  }

  /**
   * [reactive-forms](https://angular.io/guide/reactive-forms)<br/>
   * [reactive-form-validation](https://angular.io/guide/form-validation#reactive-form-validation)
   */
  buildFormGroup() {
    let e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: e['id'],
      name: [e['name'], Validators.required],
      active: [e['active']]
    });
  }

  instantiate(options?): ContractModel {

    const tz = this.configService.fetchDateTimeConfig().tz;

    return {
      id: 1,
      version: 0,
      active: true,
      name: '',
      link: null,
      endDate: moment().tz(tz).toDate(),
      startDate: moment().tz(tz).toDate(),
      comment: null,
      contractNumber: '',
      type: {
        id: 11,
        name: "Goods",
        ident: "CONTRACT-TYPE",
        properties: null
      },
      status: {
        id: 13,
        name: "Active",
        ident: "CONTRACT-STATUS",
        properties: null
      },
      commodityCredit: null,
      autoprolongation: false,
      counterparty1: {
        id: 1,
        name: "Контагент1"
      },
      counterparty2: {
        id: 2,
        name: "Контагент2"
      },
      subContracts: []
    };
  }

  populateFormGroup() {
  }
}

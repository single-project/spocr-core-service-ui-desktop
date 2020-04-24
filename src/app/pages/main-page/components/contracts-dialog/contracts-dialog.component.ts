import {Component, OnInit} from '@angular/core';
import {EntityCardModel} from '../../../../core/models/entity-card.model';
import {ContractModel} from '../../../../core/models/global-reference.model';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ConfirmationService, DynamicDialogConfig, DynamicDialogRef} from 'primeng';
import {MessageServiceFacadeService} from '../../../../core/services/message-service-facade.service';
import {ContractService} from '../../../../core/services/contract.service';
import moment from 'moment-timezone';
import {ConfigService} from '../../../../core/services/config.service';
import {cloneDeep} from 'lodash';
import {map} from 'rxjs/operators';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {EnumerationService} from '../../../../core/services/enumeration.service';

@Component({
  selector: 'app-contracts-dialog',
  templateUrl: './contracts-dialog.component.html',
  styleUrls: ['./contracts-dialog.component.scss'],
  providers: [ConfirmationService]
})
export class ContractsDialogComponent extends EntityCardModel<ContractModel> implements OnInit {

  static tz: string;
  calendarConf: any;
  counterParties: any[] = [];
  contractTypes: any[] = [];
  contractStatuses: any[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private counterpartyService: CounterpartiesService,
    private enumerationService: EnumerationService,
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
    this.calendarConf = this.configService.getCalendarConfig();

    this.loadCounterPartiesList();
    this.loadContractTypes();
    this.loadContractStatuses();
  }

  loadCounterPartiesList(): void {
    this.counterpartyService.get().pipe(
      map(p => p.content),
    ).subscribe(party => {
      this.counterParties = party;
    });
  }

  loadContractTypes(): void {
    this.enumerationService.fetchContractTypes().pipe(
      map(p => p.content),
    ).subscribe(ct => {
      this.contractTypes = ct;
    });
  }

  loadContractStatuses(): void {
    this.enumerationService.fetchContractStatuses().pipe(
      map(p => p.content),
    ).subscribe(cs => {
      this.contractStatuses = cs;
    });
  }

  formTransform(obj?: any): any {
    const contractClone = cloneDeep(obj);

    contractClone.startDate = moment(contractClone.startDate, 'YYYY-MM-DD')
      .utc().format('YYYY-MM-DDTHH:mm:ss') + ' UTC';

    contractClone.endDate = moment(contractClone.endDate, 'YYYY-MM-DD')
      .utc().format('YYYY-MM-DDTHH:mm:ss') + ' UTC';

    contractClone.subContracts.forEach((subContract) => {
      subContract.subContractDate = moment(contractClone.endDate, 'YYYY-MM-DD')
        .utc().format('YYYY-MM-DDTHH:mm:ss') + ' UTC';
    });

    return contractClone;
  }

  /**
   * [reactive-forms](https://angular.io/guide/reactive-forms)<br/>
   * [reactive-form-validation](https://angular.io/guide/form-validation#reactive-form-validation)
   */
  buildFormGroup() {
    let e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: [e['id']],
      version: [e['version']],
      active: [e['active']],
      name: [e['name'], Validators.required],
      link: [e['link']],
      endDate: [moment(e['endDate'], 'YYYY-MM-DD').toDate()],
      startDate: [moment(e['startDate'], 'YYYY-MM-DD').toDate()],
      comment: [e['comment']],
      contractNumber: [e['contractNumber'], Validators.required],
      type: [{...e['type']}, Validators.required],
      status: [{...e['status']}, Validators.required],
      commodityCredit: [e['commodityCredit']],
      autoprolongation: [e['autoprolongation']],
      counterparty1: [{...e['counterparty1']}, Validators.required],
      counterparty2: [{...e['counterparty2']}, Validators.required],
      subContracts: this.formBuilder.array(
        e['subContracts'].map((subContract) => (
          this.formBuilder.group({
            active: [subContract.active],
            comment: [subContract.comment],
            contract: [subContract.comment], // на форме не показывать
            id: [subContract.id],
            link: [subContract.link],
            name: [subContract.name, Validators.required],
            status: [subContract.status, Validators.required],
            subContractDate: [moment(subContract.subContractDate, 'YYYY-MM-DD').toDate(), Validators.required],
            subContractNumber: [subContract.subContractNumber],
            version: [subContract.version]
          })
        )))
    });
  }

  get subContracts() {
    return this.entityDialogForm.get('subContracts') as FormArray;
  }

  getSubContractName(item: any, index: number) {
    const name = item.get('name').value ? item.get('name').value : `Доп.соглашениe * ${index + 1}`;
    return name;
  }

  addSubContract() {
    const tz = this.configService.getDateTimeConfig().tz;
    const paymentArray = this.entityDialogForm.get('subContracts') as FormArray;

    paymentArray.push(this.formBuilder.group({
      active: [false],
      comment: [null],
      contract: [null],
      id: [null],
      link: [null],
      name: [null],
      status: [{
        id: null,
        name: null,
        ident: null,
        properties: null
      }],
      subContractDate: [moment().tz(tz).toDate()],
      subContractNumber: [null],
      version: [0]
    }))
  }

  removeSubContract($event, i) {
    $event.stopPropagation();
    $event.preventDefault();
    const paymentArray = this.entityDialogForm.get('subContracts') as FormArray;

    this.confirmationService.confirm({
      header: 'Предупреждение',
      icon: 'pi pi-exclamation-triangle',
      message: `Удалить "${this.getSubContractName(paymentArray.controls[i], i)}"?`,
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
        paymentArray.removeAt(i);
      },
      key: 'positionDialog',
    });
  }

  instantiate(options?): ContractModel {
    const tz = this.configService.getDateTimeConfig().tz;

    return {
      id: null,
      version: 0,
      active: true,
      name: null,
      link: null,
      endDate: moment().tz(tz).toDate(),
      startDate: moment().tz(tz).toDate(),
      comment: null,
      contractNumber: '',
      type: {
        id: null,
        name: null,
        ident: null,
        properties: null
      },
      status: {
        id: null,
        name: null,
        ident: null,
        properties: null
      },
      commodityCredit: 0,
      autoprolongation: false,
      counterparty1: {
        id: null,
        name: null
      },
      counterparty2: {
        id: null,
        name: null
      },
      subContracts: [
        {
          active: false,
          comment: null,
          contract: null,
          id: null,
          link: null,
          name: null,
          status: null,
          subContractDate: moment().tz(tz).toDate(),
          subContractNumber: null,
          version: 0
        }
      ]
    };
  }

  populateFormGroup() {
  }
}

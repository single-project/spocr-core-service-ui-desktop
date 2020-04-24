import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import {
  Citizenship,
  CounterpartyModel,
  Gender,
  LegalRekv,
  PaymentDetails,
  PersonRekv
} from '../../../../core/models/global-reference.model';
import { CounterpartiesService } from '../../../../core/services/counterparties.service';
import { ConfigService } from '../../../../core/services/config.service';
import { map, shareReplay } from 'rxjs/operators';
import { PersonalRekvService } from '../../../../core/services/personal-rekv.service';
import { forkJoin } from 'rxjs';
import { EntityCardModel } from "../../../../core/models/entity-card.model";
import { ManufactureService } from "../../../../core/services/manufacture.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng";
import { MessageServiceFacadeService } from "../../../../core/services/message-service-facade.service";
import moment from 'moment-timezone';
import { cloneDeep } from 'lodash'

@Component({
  selector: 'app-counterparty-dialog',
  templateUrl: './counterparty-dialog.component.html',
  styleUrls: ['./counterparty-dialog.component.scss']
})
export class CounterpartyDialogComponent extends EntityCardModel<CounterpartyModel> implements OnInit, OnChanges, AfterViewInit {

  public generalLegalTypes = [];
  public selectedLegalType: { id: number, name: string };
  public dropDownShow = false;
  public parentsList = [];
  public statusesList = [];
  public citizenship = [];
  public genders = [];
  public docTypes = [];
  public personReq = false;
  public legalReq = false;
  public paymentReqs = false;


  public ruCalLocale = {
    firstDayOfWeek: 1,
    dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
    dayNamesShort: ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт", "Вск"],
    dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    today: 'Сегодня',
    clear: 'Очист.',
    weekHeader: 'Нед'
  };

  constructor(configService: ConfigService,
              private personalService: PersonalRekvService,
              private manufacturerService: ManufactureService,
              public dialogRef: DynamicDialogRef,
              public dialogConfig: DynamicDialogConfig,
              public formBuilder: FormBuilder,
              private counterpartyService: CounterpartiesService,
              private messageService: MessageServiceFacadeService,
  ) {
    super(formBuilder, dialogRef, dialogConfig, counterpartyService, messageService, configService);
    this.paymentReqs = !!this.entity.paymentDetails;
    this.personReq = !!this.entity.personRekv;
    this.legalReq = !!this.entity.legalRekv;
  }

  ngOnInit() {
    this.loadAvailableLegalTypes();
    this.loadCounterpartiesList();
    this.loadStatusesList();
    this.loadAvailablePersonalData();
    console.dir(this.entity);

  }

  ngAfterViewInit(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {

  }

  loadAvailableLegalTypes(): void {
    this.counterpartyService.fetchLegalTypes().pipe(
      shareReplay()
    ).subscribe(c => {
      this.generalLegalTypes = c['content'];
    });
  }

  loadAvailablePersonalData(): void {
    forkJoin([
      this.personalService.fetchCitizenship(),
      this.personalService.fetchDocTypes(),
      this.personalService.fetchGender()])
      .subscribe(data => {
        this.citizenship = data[0]['content'];

        this.docTypes = data[1]['content'];

        this.genders = data[2]['content'];

      })

  }

  loadCounterpartiesList(): void {
    this.counterpartyService.get().pipe(
      map(p => p.content),
    ).subscribe(party => {
      this.parentsList = party
    });
  }

  loadStatusesList(): void {
    this.counterpartyService.fetchCounterpartiesStatuses()
      .pipe(map(s => s['content']))
      .subscribe(s => {
        this.statusesList = s;
      })
  }

  addLegalRekv(): void {
    this.removePersonRekv();
    if (!this.entity.legalRekv) {
      this.entity.legalRekv = {} as LegalRekv;
    }
    let legalRekv = this.entity.legalRekv;
    this.addNestedObjectIfNotContains('legalRekv', {
      id: legalRekv.id,
      version: legalRekv.version,
      shortName: legalRekv.shortName,
      fullName: legalRekv.fullName,
      inn: legalRekv.inn,
      ogrn: legalRekv.ogrn,
      kpp: legalRekv.kpp,
      suggestion: legalRekv.suggestion,
      innSug: ''
    });
    this.legalReq = true;
    this.entityDialogForm.get('legalRekv').markAsTouched();
  }

  removeLegalRekv() {
    this.legalReq = false;
    this.removeNestedObjectIfContains('legalRekv');
  }

  removePersonRekv() {
    this.personReq = false;
    this.removeNestedObjectIfContains('personRekv');
  }

  onAddReqClicked() {
    this.dropDownShow = true;
  }

  addPersonRekv(): void {
    if (!this.entity.personRekv) {
      this.entity.personRekv = {} as PersonRekv;
    }

    if (!this.entity.personRekv.citizenship) {
      this.entity.personRekv.citizenship = {} as Citizenship;
    }
    if (!this.entity.personRekv.gender) {

      this.entity.personRekv.gender = {} as Gender;
    }
    if (!this.entity.personRekv.docType) {

      this.entity.personRekv.docType = {};
    }
    this.removeLegalRekv();
    let personRekv = this.entity.personRekv;
    this.addNestedObjectIfNotContains('personRekv', {
      id: personRekv.id,
      version: personRekv.version,
      name: [personRekv.name, Validators.required],
      lastName: personRekv.lastName,
      firstName: personRekv.firstName,
      patronymic: personRekv.patronymic,
      birthDate: moment(personRekv.birthDate).toDate(),
      birthPlace: personRekv.birthPlace,
      docType: {
        id: personRekv.docType.id,
        name: personRekv.docType.name,
        ident: personRekv.docType.ident,
        properties: personRekv.docType.properties
      },
      docSeriesNumber: personRekv.docSeriesNumber,
      inn: [personRekv.inn, Validators.compose([Validators.maxLength(12), Validators.minLength(12)])],
      citizenship: {
        id: personRekv.citizenship.id,
        name: personRekv.citizenship.name,
        ident: personRekv.citizenship.ident,
        properties: personRekv.citizenship.properties
      },
      gender: {
        id: personRekv.gender.id,
        name: personRekv.gender.name,
        ident: personRekv.gender.ident,
        properties: personRekv.gender.properties
      },
      email: [personRekv.email, Validators.email],
      phones: [personRekv.phones,],
    });
    this.personReq = true;
  }

  addPaymentDetails() {
    this.entityDialogForm.addControl('paymentDetails', this.formBuilder.array([]));
    if (!this.entity.paymentDetails) {
      this.pushPaymentDetails();
    }
    if (this.entity.paymentDetails) {
      this.entity.paymentDetails.forEach(pd => {
        this.pushPaymentDetails(pd);
      });
    }
  }

  insertPaymentDetail(): void {
    this.pushPaymentDetails();
  }

  deletePaymentDetail(index: number): void {
    const paymentArray = this.entityDialogForm.get('paymentDetails') as FormArray;
    paymentArray.removeAt(index);
  }

  pushPaymentDetails(values?: PaymentDetails) {

    const paymentArray = this.entityDialogForm.get('paymentDetails') as FormArray;
    if (values) {
      paymentArray.push(this.formBuilder.group({
        ...values
      }))
    } else if (!values) {
      paymentArray.push(this.formBuilder.group({
        id: null,
        paymentAccount: '',
        correspondingAccount: '',
        bic: '',
        bank: '',
      }))
    }

  }

  get paymentDetails() {
    return this.entityDialogForm.get('paymentDetails') as FormArray;
  }

  getBankName(detail: any): string {
    return detail.get('bank').value
  }

  buildFormGroup() {

    let e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: e.id,
      version: e.version,
      active: e.active || true,
      name: [e.name, Validators.required],
      statuses: [e.statuses],
      parent: e.parent,
      owner: e.owner,
      updatedFields: []
    });
    if (e.legalRekv) {
      this.addLegalRekv();
    }
    if (e.personRekv) {
      this.addPersonRekv();
    }

    this.addPaymentDetails();

  }

  instantiate(): CounterpartyModel {

    return {} as CounterpartyModel;
  }

  populateFormGroup() {
    return;
  }

  switchPartyReq() {
    if (this.selectedLegalType.id === 5) {
      this.addPersonRekv();
    } else if (this.selectedLegalType.id === 6) {
      this.addLegalRekv()
    }
    this.dropDownShow = false;
  }

  removeReq() {
    this.removeLegalRekv();
    this.removePersonRekv();
  }

  formTransform(obj?: any): any {
    const deepClone = cloneDeep(obj);
    if (obj['personRekv']) {
      deepClone['personRekv']['birthDate'] = moment(deepClone['personRekv']['birthDate'], 'YYYY-MM-DD')
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss') + ' UTC';
    }
    deepClone['contacts'].map(cp => {
      console.dir(cp);
      cp['person']['birthDate'] = moment(cp['person']['birthDate'], 'YYYY-MM-DD')
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss') + ' UTC';
    });
    return deepClone;
  }

  save(): void {
    this.entityDialogForm.removeControl('innSug');
    super.save();
  }


}

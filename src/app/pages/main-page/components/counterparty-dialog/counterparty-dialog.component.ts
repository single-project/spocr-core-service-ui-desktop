import {
  AfterViewInit,
  Component, ElementRef,
  OnChanges,
  OnInit, Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CounterpartyModel} from '../../../../core/models/global-reference.model';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ConfigService} from '../../../../core/services/config.service';
import {map, shareReplay} from 'rxjs/operators';
import {PersonalRekvService} from '../../../../core/services/personal-rekv.service';
import {forkJoin, noop} from 'rxjs';
import {EntityCardModel} from "../../../../core/models/entity-card.model";
import {ManufactureService} from "../../../../core/services/manufacture.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {MessageServiceFacadeService} from "../../../../core/services/message-service-facade.service";

@Component({
  selector: 'app-counterparty-dialog',
  templateUrl: './counterparty-dialog.component.html',
  styleUrls: ['./counterparty-dialog.component.scss']
})
export class CounterpartyDialogComponent extends EntityCardModel<CounterpartyModel> implements OnInit, OnChanges, AfterViewInit {

  public generalLegalTypes = [];
  public selectedGeneralLegalType = [];
  public parentsList = [];
  public statusesList = [];
  public citizenships = [];
  public genders = [];
  public docTypes = [];
  public showLegalTypeChoice = false;
  public personReq = false;
  public legalReq = false;
  public paymentReqs = false;
  @ViewChild('addReqBtn') addReqBtn;
  @ViewChild('addPaymentReqBtn') addPaymentReqBtn;

  public ruCalLocale = {
    firstDayOfWeek: 1,
    dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
    dayNamesShort: ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт", "Вск"],
    dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    today: 'Сегодня',
    clear: 'Очист.',
    dateFormat: 'dd.mm.yy',
    weekHeader: 'Нед'
  };

  constructor(private configService: ConfigService,
              private personalService: PersonalRekvService,
              private manufacturerService: ManufactureService,
              public dialogRef: DynamicDialogRef,
              public dialogConfig: DynamicDialogConfig,
              public formBuilder: FormBuilder,
              private counterpartyService: CounterpartiesService,
              private messageService: MessageServiceFacadeService,
              private renderer: Renderer2) {
    super(formBuilder, dialogRef, dialogConfig, counterpartyService, messageService);
    this.paymentReqs = !!this.entity;
    this.personReq = !!this.entity;
    this.legalReq = !!this.entity;
  }

  ngOnInit() {
    this.loadAvailableLegalTypes();
    this.loadCounterpartiesList();
    this.loadStatusesList();
    this.loadAvailablePersonalData();

  }

  ngAfterViewInit(): void {
    this.initPaymentReqBtn();
    this.initAddReqBtn();

  }


  ngOnChanges(changes: SimpleChanges): void {

  }

  loadAvailableLegalTypes(): void {
    this.configService.fetchAppSettings().pipe(
      shareReplay()
    ).subscribe(c => {
      this.generalLegalTypes = c['newLegalTypes'];
    });
  }

  loadAvailablePersonalData(): void {
    forkJoin([
      this.personalService.fetchCitizenship(),
      this.personalService.fetchDocTypes(),
      this.personalService.fetchGender()])
      .subscribe(data => {
        this.citizenships = data[0]['content'];

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

  buildFormGroup(e: CounterpartyModel) {

    this.entityDialogForm = this.formBuilder.group({
      id: e.id,
      version: e.version,
      active: e.active,
      name: [e.name, Validators.required],
      statuses: [e.statuses],
      parent: e.parent,
      owner: e.owner,
      updatedFields: []
    });

    if (e.legalRekv) {
      let legalRekv = e.legalRekv;
      this.entityDialogForm.addControl("legalRekv", this.formBuilder.group({
        id: legalRekv.id,
        shortName: [{value: legalRekv.shortName, disabled: true}],
        fullName: [{value: legalRekv.fullName, disabled: true}],
        inn: [{value: legalRekv.inn, disabled: true}],
        ogrn: [{value: legalRekv.ogrn, disabled: true}],
        kpp: [{value: legalRekv.kpp, disabled: true}],
        suggestion: legalRekv.suggestion,
        innSug: ''
      }));
    }

    if (e.personRekv) {
      let personRekv = e.personRekv;
      this.entityDialogForm.addControl("personRekv", this.formBuilder.group({
        id: personRekv.id,
        name: [personRekv.name, Validators.required],
        lastName: personRekv.lastName,
        firstName: personRekv.firstName,
        patronymic: personRekv.patronymic,
        birthDate: personRekv.birthDate,
        birthPlace: personRekv.birthPlace,
        docType: this.formBuilder.group([]),
        docSeriesNumber: personRekv.docSeriesNumber,
        inn: [personRekv.inn, Validators.compose([Validators.maxLength(12), Validators.minLength(12)])],
        citizenship: this.formBuilder.group({
          id: personRekv.citizenship.id,
          name: personRekv.citizenship.name,
          ident: personRekv.citizenship.ident,
          properties: personRekv.citizenship.properties
        }),
        gender: this.formBuilder.group({
          id: personRekv.gender.id,
          name: personRekv.gender.name,
          ident: personRekv.gender.ident,
          properties: personRekv.gender.properties
        }),
        email: [personRekv.email, Validators.email],
        phones: [personRekv.phones,],
      }));
    }
    if (e.paymentDetails) {
      let paymentDetails = e.paymentDetails;
      this.entityDialogForm.addControl("paymentDetails", this.formBuilder.group({
        id: paymentDetails.id,
        paymentAccount: paymentDetails.paymentAccount,
        correspondingAccount: paymentDetails.correspondingAccount,
        bic: paymentDetails.bic,
        bank: paymentDetails.bank,
      }));
    }
  }

  legalTypeChoose(val: string) {
    this.showLegalTypeChoice = false;
    if (val === '1') {
      this.personReq = true;
    } else if (val === '2') {
      this.legalReq = true;
    }
  }


  instantiate(): CounterpartyModel {

    return {personRekv: {citizenship: {}, gender: {}}, legalRekv: {}, paymentDetails: {}, active: true} as CounterpartyModel;
  }

  populateFormGroup(e: CounterpartyModel) {
    return;
  }

  save(): void {
    if(this.entityDialogForm.dirty){
      if(this.isNew()){
        this.entityDialogForm.removeControl('updatedFields');
      }else {
        this.entityDialogForm.patchValue({updatedFields: this.getUpdatedFields()});
      }
      super.save();
    }else {
      this.close(false)
    }

  }

  initPaymentReqBtn(): void {
    this.addPaymentReqBtn.externalRequisiteVisible$.asObservable().subscribe(value => {
      this.paymentReqs = value;
      if(!value){
        this.entityDialogForm.get('paymentDetails').reset();
        this.entityDialogForm.get('paymentDetails').markAsDirty();
      }
    });
  }

  initAddReqBtn(): void{
    this.addReqBtn.selectedType$.asObservable().subscribe(value => {
      if(value === '1'){
        this.personReq = true;
        this.legalReq = false;
      }else if(value === '2'){
        this.legalReq = true;
        this.personReq = false;
      }
    });
    this.addReqBtn.externalRequisiteVisible$.asObservable().subscribe(value => {
      if(!value){
        this.personReq = false;
        this.legalReq = false;
        this.entityDialogForm.reset('personRekv');
        this.entityDialogForm.reset('legalRekv');
      }
    });


  }

}

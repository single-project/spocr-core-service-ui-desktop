import {
  AfterViewInit,
  Component, ElementRef,
  OnChanges,
  OnInit, Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {
  Citizenship,
  CounterpartyModel, Gender,
  LegalRekv,
  PaymentDetails,
  PersonRekv
} from '../../../../core/models/global-reference.model';
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
  public selectedLegalType: {id: number, name: string};
  public dropDownShow = false;
  public parentsList = [];
  public statusesList = [];
  public citizenships = [];
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
              ) {
    super(formBuilder, dialogRef, dialogConfig, counterpartyService, messageService);
    this.paymentReqs = !!this.entity.paymentDetails;
    this.personReq = !!this.entity.personRekv;
    this.legalReq = !!this.entity.legalRekv;
  }

  ngOnInit() {
    this.loadAvailableLegalTypes();
    this.loadCounterpartiesList();
    this.loadStatusesList();
    this.loadAvailablePersonalData();


  }

  ngAfterViewInit(): void {
    // this.initPaymentReqBtn();
    // this.initAddReqBtn();
    // if(this.entity.paymentDetails){
    //   this.entityDialogForm.patchValue({paymentDetails: [...this.entity.paymentDetails]})
    // }else{
    //   this.entityDialogForm.patchValue({paymentDetails: []})
    // }


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

  addLegalRekv(): void{
    this.removePersonRekv();
    if(!this.entity.legalRekv){
      this.entity.legalRekv = {} as LegalRekv;
    }
    let legalRekv = this.entity.legalRekv;
    this.addNestedObjectIfNotContains('legalRekv', {
      id: legalRekv.id,
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
  removeLegalRekv(){
    this.legalReq = false;
    this.removeNestedObjectIfContains('legalRekv');
  }

  removePersonRekv(){
    this.personReq = false;
    this.removeNestedObjectIfContains('personRekv');
  }

  onAddReqClicked(){
    this.dropDownShow = true;
  }

  addPersonRekv(): void{
    if(!this.entity.personRekv){
      this.entity.personRekv = {} as PersonRekv;
      this.entity.personRekv.citizenship = {} as Citizenship;
      this.entity.personRekv.gender = {} as Gender;
    }
    this.removeLegalRekv();
    let personRekv = this.entity.personRekv;
    this.addNestedObjectIfNotContains('personRekv', {
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
    });
    this.personReq = true;
  }

  addPaymentDetails(){
    if (!this.entity.paymentDetails) {
        this.entity.paymentDetails = [] as PaymentDetails[];
    }

    let paymentDetail = this.entity.paymentDetails[0];
    this.addNestedObjectIfNotContains('paymentDetail', {
      id: paymentDetail.id,
      paymentAccount: paymentDetail.paymentAccount,
      correspondingAccount: paymentDetail.correspondingAccount,
      bic: paymentDetail.bic,
      bank: paymentDetail.bank,
    })
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
      // paymentDetails:[],
      updatedFields: []
    });
    if (e.legalRekv) {
      this.addLegalRekv();
    }
    if (e.personRekv) {
      this.addPersonRekv();
    }
    // if (e.paymentDetails) {
    //   this.addPaymentDetails();
    // }
  }

  instantiate(): CounterpartyModel {

    return {} as CounterpartyModel;
  }

  populateFormGroup() {
    return;
  }

  switchPartyReq(){
    if(this.selectedLegalType.id === 5){
      this.addPersonRekv();
    }else if(this.selectedLegalType.id === 6){
      this.addLegalRekv()
    }
    this.dropDownShow = false;
  }

  removeReq(){
    this.removeLegalRekv();
    this.removePersonRekv();
  }

  save(): void {
   this.entityDialogForm.removeControl('innSug');
    super.save();
  }



}

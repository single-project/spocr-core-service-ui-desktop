import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CounterpartyModel} from '../../../../core/models/global-reference.model';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ConfigService} from '../../../../core/services/config.service';
import {map, shareReplay, tap} from 'rxjs/operators';
import {PersonalRekvService} from '../../../../core/services/personal-rekv.service';
import {forkJoin} from 'rxjs';

enum FormLegalType {
  NONE = 0,
  PARTY = 1,
  PERSON = 2,

}


@Component({
  selector: 'app-counterparty-dialog',
  templateUrl: './counterparty-dialog.component.html',
  styleUrls: ['./counterparty-dialog.component.scss']
})
export class CounterpartyDialogComponent implements OnInit, OnChanges {
  @Input() public counterparty: CounterpartyModel;
  @Output() public onCounterpartySaved = new EventEmitter<CounterpartyModel>();
  public _display = false;
  public counterPartyForm: FormGroup;
  public generalLegalTypes = [];
  public selectedGeneralLegalType = [];
  public formLegalType: FormLegalType;
  public isNew = false;
  public parentsList = [];
  public statusesList =[];
  public citizenships = [];
  public genders = [];
  public docTypes = [];
  public ruCalLocale = {
    firstDayOfWeek: 1,
    dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
    dayNamesShort: ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт", "Вск"],
    dayNamesMin: ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
    monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
    monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн","Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
    today: 'Сегодня',
    clear: 'Очист.',
    dateFormat: 'dd.mm.yy',
    weekHeader: 'Нед'
  };

  constructor(
     private fb: FormBuilder,
     private counterpartyService: CounterpartiesService,
     private configService: ConfigService,
     private personalService: PersonalRekvService,
  ) {
    this.counterPartyForm = this.counterpartyBuildForm();


  }

  ngOnInit() {

    this.loadAvailableLegalTypes();
    this.loadCounterpartiesList();
    this.loadStatusesList();
    this.loadAvailablePersonalData();

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

  loadAvailablePersonalData(): void{
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
    this.counterpartyService.fetchData().pipe(
      map(p => p.content),
    ).subscribe(party => {
      this.parentsList = party
    });
  }

  loadStatusesList(): void{
    this.counterpartyService.fetchCounterpartiesStatuses()
      .pipe(map(s => s['content']))
      .subscribe(s => {
        this.statusesList = s;
      })
  }

  chooseLegalType() {
    if (this.selectedGeneralLegalType['id'] === '2') {
      this.formLegalType = FormLegalType.PARTY
    } else if (this.selectedGeneralLegalType['id'] === '1') {
      this.formLegalType = FormLegalType.PERSON
    }
    console.dir(this.selectedGeneralLegalType)
  }


  counterpartySaved() {

    if (!this.counterPartyForm.dirty) {
      this.closeDialog();
    } else {
      this.counterPartyForm.patchValue({updatedFields: this.getUpdatedFields(this.counterPartyForm)});
      this.counterPartyForm.removeControl('legalRekv.innSug');
      if (this.isNew) {
        this.counterPartyForm.removeControl('updatedFields');
        this.saveCounterparty(this.counterPartyForm.value);

      } else {

        this.saveCounterparty(this.counterPartyForm.value);
      }
    }

  }

  saveCounterparty(party: CounterpartyModel): void {
    if (this.isNew) {
      this.counterpartyService.newItem(party).subscribe(
        savedParty => this.onCounterpartySaved.emit(savedParty)
      )
    }
  }

  getUpdatedFields(form: any) {
    let dirtyValues = {};
    Object.keys(form.controls).forEach(k => {
      let currentControl = form.controls[k];
      if (currentControl.dirty) {
        dirtyValues[k] = currentControl.value;

      }
    });
    return Object.keys(dirtyValues);
  }

  closeDialog() {
    this.counterPartyForm.reset();
    this.formLegalType = FormLegalType.NONE;
    this._display = false;
  }

  initPartyFormValues(fields: { [key: string]: any }[]): void {
    fields.forEach(field => {
      this.counterPartyForm.patchValue({...field});
    });

  }

  counterpartyBuildForm(): FormGroup {
    return this.fb.group({
      id: null,
      version: null,
      active: true,
      name: ['', Validators.required],

      legalType: this.fb.group({
        id: null,
        name: '',
        ident: '',
        properties: this.fb.group({
          opfType: '',
          opfShort: '',
          opfFull: '',
          opfCode: '',
        })
      }),
      legalRekv: this.fb.group({
        shortName: [{value: '', disabled: true}],
        fullName: [{value: '', disabled: true}],
        inn: [{value: '', disabled: true}],
        ogrn: [{value: '', disabled: true}],
        kpp: [{value: '', disabled: true}],

        innSug: ''
      }),
      paymentDetails: this.fb.group({
        id: null,
        version: null,
        active: true,
        paymentAccount: '',
        correspondingAccount: '',
        bic: '',
        bank: '',
      }),
      parent: null,
      statuses: [],
      personRekv: this.fb.group({
        id: null,
        version: null,
        active: true,
        name: ['', Validators.required],
        lastName: '',
        firstName: '',
        patronymic: '',
        birthDate: null,
        birthPlace: null,
        docType: this.fb.group([]),
        docSeriesNumber: null,
        inn: [null, Validators.compose([Validators.maxLength(12), Validators.minLength(12)])],
        citizenship: this.fb.group({
          id: null,
          name: '',
          ident: '',
          properties: null
        }),
        gender: this.fb.group({
          id: null,
          name: '',
          ident: '',
          properties: null
        }),
        email: [null, Validators.email],
        phones: [null, ],
      }),
      owner: this.fb.group({
        id: null,
        version: null,
        active: true,
        name: '',
      }),
      suggestion: null,

      updatedFields: []
    });
  }

  afterShow(): void {
    if (Object.keys(this.counterparty).length <= 1) {
      this.isNew = true;
    } else {
      this.isNew = false;
    }
    if (this.isNew) {
      this.formLegalType = FormLegalType.NONE;
    }

    if (!this.isNew) {
      if (!!this.counterparty.legalType.properties.opfType) {
        this.formLegalType = FormLegalType.PARTY;
      } else {
        this.formLegalType = FormLegalType.PERSON;
      }
      this.initPartyFormValues([

        {id: this.counterparty.id},
        {version: this.counterparty.version},
        {name: this.counterparty.name},
        {active: this.counterparty.active},
        {
          legalRekv: this.counterparty.legalRekv
        },
        {
          legalType: this.counterparty.legalType
        },
        {
          paymentDetails: this.counterparty.paymentDetails
        },
        {
          personRekv: this.counterparty.personRekv
        },
        // {
        //   owner: this.counterparty.owner || null
        // },
        {
          parent: this.counterparty.parent
        },
        {
          statuses: this.counterparty.statuses
        },
        {
          suggestion: this.counterparty.suggestion
        },


      ]);
    } else {
      this.counterPartyForm.reset();
    }


  }


}

import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CounterpartyModel} from '../../../../core/models/global-reference.model';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ConfigService} from '../../../../core/services/config.service';
import {shareReplay, tap} from 'rxjs/operators';

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
  public formLegalType = FormLegalType.NONE;
  public isNew = false;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(CounterpartiesService) private counterpartyService: CounterpartiesService,
    @Inject(ConfigService) private configService: ConfigService
  ) {
    this.counterPartyForm = this.counterpartyBuildForm();


  }

  ngOnInit() {

    this.loadAvailableLegalTypes();

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
      this.counterpartyService.newCounterparty(party).subscribe(
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
      statuses: this.fb.group({
        id: null,
        name: '',
        ident: '',
        properties: null,
      }),
      personRekv: this.fb.group({
        id: null,
        version: null,
        active: true,
        name: '',
        lastName: '',
        firstName: '',
        patronymic: '',
        birthDate: null,
        birthPlace: null,
        docType: this.fb.group({
          id: null,
          name: '',
          ident: '',
          properties: null
        }),
        docSeriesNumber: null,
        inn: null,
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
        email: null,
        phones: null
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
    console.log(`Counterparty obj ${Object.keys(this.counterparty).length}`);
    if (Object.keys(this.counterparty).length <= 1) {
      this.isNew = true;
    } else {
      this.isNew = false;
    }

    if (!this.isNew) {
      if (!!this.counterparty.legalType.properties.opfType) {
        this.formLegalType = FormLegalType.PARTY;
      }else{
        this.formLegalType = FormLegalType.NONE;
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

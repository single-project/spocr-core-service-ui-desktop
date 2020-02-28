import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CounterpartyModel, CounterpartyProperties} from '../../../../core/models/global-reference.model';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import * as _ from 'lodash';

enum FormLegalType {
  PARTY,
  PERSON
}

@Component({
  selector: 'app-counterparty-dialog',
  templateUrl: './counterparty-dialog.component.html',
  styleUrls: ['./counterparty-dialog.component.scss']
})
export class CounterpartyDialogComponent implements OnInit, OnChanges {
  @Input() counterparty: CounterpartyModel;
  @Output() onCounterpartySaved = new EventEmitter<CounterpartyModel>();
  public _display = false;
  public counterPartyForm: FormGroup;
  public generalLegalTypes = [
    {id: 1, value: 'Юридическое лицо / ИП'},
    {id: 2, value: 'Физическое лицо'}
  ];
  public selectedGeneralLegalType = [];
  public formLegalType: FormLegalType;

  private isNew = false;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(CounterpartiesService) private counterpartyService: CounterpartiesService
  ) {
    this.counterPartyForm = this.counterpartyBuildForm();


  }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  counterpartySaved() {

    if (!this.counterPartyForm.dirty) {
      this.closeDialog();
    } else {
      this.counterPartyForm.patchValue({updatedFields: this.getUpdatedFields(this.counterPartyForm)});
      if (this.isNew) {
        this.counterPartyForm.removeControl('updatedFields');
        this.counterPartyForm.removeControl('legalRekv.innSug');
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
    this._display = false;

  }

  initPartyFormValues(fields: { [key: string]: any }[]): void {
    fields.forEach(field => {
      this.counterPartyForm.patchValue({...field});
    })
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
      suggestion: null,
      updatedFields: []
    });
  }

  afterShow(): void {
    if (Object.keys(this.counterparty).length <= 1) {
      this.isNew = true;
    }

    if (!this.isNew) {
      if (!!this.counterparty.legalType.properties.opfType) {
        this.formLegalType = FormLegalType.PARTY;
      }
      this.initPartyFormValues([
        {id: this.counterparty.id},
        {version: this.counterparty.version},
        {name: this.counterparty.name},
        {active: this.counterparty.active},
        {
          legalRekv: {
            shortName: this.counterparty.legalRekv.shortName,
            fullName: this.counterparty.legalRekv.fullName,
            inn: this.counterparty.legalRekv.inn,
            ogrn: this.counterparty.legalRekv.ogrn,
            kpp: this.counterparty.legalRekv.kpp
          },
        },
        {
          legalType: {
            id: this.counterparty.legalType.id,
            name: this.counterparty.legalType.name,
            ident: this.counterparty.legalType.ident,
            properties: {
              opfType: this.counterparty.legalType.properties.opfType,
              opfShort: this.counterparty.legalType.properties.opfShort,
              opfFull: this.counterparty.legalType.properties.opfFull,
              opfCode: this.counterparty.legalType.properties.opfCode,
            }
          }
        },
        {
          paymentDetails: {
            id: this.counterparty.paymentDetails.id,
            version: this.counterparty.paymentDetails.version,
            active: this.counterparty.paymentDetails.active,
            paymentAccount: this.counterparty.paymentDetails.paymentAccount,
            correspondingAccount: this.counterparty.paymentDetails.correspondingAccount,
            bic: this.counterparty.paymentDetails.bic,
            bank: this.counterparty.paymentDetails.bank,
          }
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

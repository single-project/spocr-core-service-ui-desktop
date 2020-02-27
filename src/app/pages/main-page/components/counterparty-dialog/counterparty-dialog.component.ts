import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PartySuggestion} from "../../../../core/models/suggestion-party.model";
import {CounterpartyModel} from '../../../../core/models/global-reference.model';

@Component({
  selector: 'app-counterparty-dialog',
  templateUrl: './counterparty-dialog.component.html',
  styleUrls: ['./counterparty-dialog.component.scss']
})
export class CounterpartyDialogComponent implements OnInit, OnChanges {
  @Input() counterparty: CounterpartyModel;
  @Input() display: boolean;
  @Output() onEditedCounterpartySave = new EventEmitter<any>();
  @Output() onNewCounterpartySaved = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newCounterparty: CounterpartyModel = <CounterpartyModel>{};
  private partyRequisitesSuggestion: PartySuggestion;
  private isNew = false;
  public _display = false;
  counterPartyForm: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.counterPartyForm = this.counterpartyBuildForm();

  }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  counterpartySaved() {

    if (this.isNew) {
      this.counterPartyForm.removeControl('updatedFields');
      this.counterPartyForm.removeControl('legalRekv.innSug');
    } else {


    }

    this.onCloseDialog.emit(false);

  }


  closeDialog() {
    this.onCloseDialog.emit(false);
    this.counterPartyForm.reset();
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
        version: null,
        active: true,
        name: '',
        opfShort: '',
        opfFull: '',
        opfCode: '',
        opfType: '',
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
            version: this.counterparty.legalType.version,
            active: this.counterparty.legalType.active,
            name: this.counterparty.legalType.name,
            opfShort: this.counterparty.legalType.opfShort,
            opfFull: this.counterparty.legalType.opfFull,
            opfCode: this.counterparty.legalType.opfCode,
            opfType: this.counterparty.legalType.opfType,
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

import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel, PartyLegalRekv, PartyPaymentDetails} from "../../../../core/models/counterparty.model";
import {DadataConfig} from "@kolkov/ngx-dadata";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PartySuggestion} from "../../../../core/models/suggestion-party.model";
import {version} from "punycode";

@Component({
  selector: 'app-counterparty-dialog',
  templateUrl: './counterparty-dialog.component.html',
  styleUrls: ['./counterparty-dialog.component.scss']
})
export class CounterpartyDialogComponent implements OnInit, OnChanges {
  @Input() counterparty: CounterpartyModel;
  @Input() display: boolean;
  @Input() isNew: boolean;
  @Input() dadataConfig: DadataConfig;
  @Output() onEditedCounterpartySave = new EventEmitter<any>();
  @Output() onNewCounterpartySaved = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newCounterparty: CounterpartyModel = <CounterpartyModel>{};
  private partyRequisitesSuggestion: PartySuggestion;
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
      this.newCounterparty.name = this.counterPartyForm.get('counterName').value;
      this.newCounterparty.active = this.counterPartyForm.get('counterActive').value;
      this.newCounterparty.suggestion = this.partyRequisitesSuggestion;
      this.newCounterparty.legalRekv = {
        shortName: this.partyRequisitesSuggestion.value,
        fullName: this.partyRequisitesSuggestion.unrestricted_value,
        inn: this.partyRequisitesSuggestion.data.inn,
        kpp: this.partyRequisitesSuggestion.data.kpp,
        ogrn: this.partyRequisitesSuggestion.data.ogrn,
        ogrnDate: this.partyRequisitesSuggestion.data.ogrn_date,
        okpo: this.partyRequisitesSuggestion.data.okpo
      };
      this.onNewCounterpartySaved.emit(this.newCounterparty);
    } else {
      this.newCounterparty.name = this.counterPartyForm.get('counterName').value;
      this.newCounterparty.active = this.counterPartyForm.get('counterActive').value;
      this.newCounterparty.suggestion = this.partyRequisitesSuggestion;
      this.newCounterparty.id = this.counterparty.id;
      this.newCounterparty.version = this.counterparty.version;
      this.newCounterparty.legalRekv = {
        shortName: this.partyRequisitesSuggestion.value,
        fullName: this.partyRequisitesSuggestion.unrestricted_value,
        inn: this.partyRequisitesSuggestion.data.inn,
        kpp: this.partyRequisitesSuggestion.data.kpp,
        ogrn: this.partyRequisitesSuggestion.data.ogrn,
        ogrnDate: this.partyRequisitesSuggestion.data.ogrn_date,
        okpo: this.partyRequisitesSuggestion.data.okpo
      };
      this.onEditedCounterpartySave.emit(this.newCounterparty);
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
      legalType: null,
      legalRekv: this.fb.group({
        shortName: '',
        fullName: '',
        inn: '',
        ogrn: '',
        kpp: ''
      }),
      paymentDetails: this.fb.group({

      }),
      suggestion: null,
    });
  }

  afterShow(): void {
    if (!this.isNew) {
      this.initPartyFormValues([
        {name: this.counterparty.name},
        {active: this.counterparty.active},
        {shortName: this.counterparty.legalRekv.shortName},
        {fullName: this.counterparty.legalRekv.fullName},
        {inn: this.counterparty.legalRekv.inn},
        {ogrn: this.counterparty.legalRekv.ogrn},
        {kpp: this.counterparty.legalRekv.kpp}
      ]);
    } else {
      this.counterPartyForm.reset();
    }


  }

  onPartyRequisitesSaved(e) {

    this.partyRequisitesSuggestion = e;
    console.dir(e);
    this.initPartyFormValues([
      {shortName: this.partyRequisitesSuggestion.value},
      {fullName: this.partyRequisitesSuggestion.unrestricted_value},
      {inn: this.partyRequisitesSuggestion.data.inn},
      {ogrn: this.partyRequisitesSuggestion.data.ogrn},
      {kpp: this.partyRequisitesSuggestion.data.kpp}
    ])
  }


}

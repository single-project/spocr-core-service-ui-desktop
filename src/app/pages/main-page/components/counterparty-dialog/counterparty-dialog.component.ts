import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {DadataConfig} from "@kolkov/ngx-dadata";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PartySuggestion} from "../../../../core/models/suggestion-party.model";

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
    this.counterPartyForm = this.fb.group({
      'counterName': ['', Validators.required],
      'counterActive': [true],
      'partyNameShort': [{value: '', disabled: true}],
      'partyNameFull': [{value: '', disabled: true}],
      'partyInn': [{value: '', disabled: true}],
      'partyOgrn': [{value: '', disabled: true}],
      'partyKpp': [{value: '', disabled: true}]
    });

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
  }


  initPertyFormValues(fields: { [key: string]: any }[]): void {
    fields.forEach(field => {
      this.counterPartyForm.patchValue({...field});
    })
  }

  newResetForm(): void {
    this.initPertyFormValues([
      {'counterName': null},
      {'counterActive': true}
    ]);
  }

  afterShow(): void {
    if (!this.isNew) {
      this.initPertyFormValues([
        {'counterName': this.counterparty.name},
        {'counterActive': this.counterparty.active}
      ]);
    } else {
      this.newResetForm();
    }


  }

  onPartyRequisitesSaved(e) {

    this.partyRequisitesSuggestion = e;
    console.dir(e);
    this.initPertyFormValues([
      {'partyNameShort': this.partyRequisitesSuggestion.value},
      {'partyNameFull': this.partyRequisitesSuggestion.unrestricted_value},
      {'partyInn': this.partyRequisitesSuggestion.data.inn},
      {'partyOgrn': this.partyRequisitesSuggestion.data.ogrn},
      {'partyKpp': this.partyRequisitesSuggestion.data.kpp}
    ])
  }


}

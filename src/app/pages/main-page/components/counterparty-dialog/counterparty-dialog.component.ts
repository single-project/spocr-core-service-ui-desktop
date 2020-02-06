import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {DadataAddress, DadataConfig, DadataSuggestion} from "@kolkov/ngx-dadata";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounce, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
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
  private party: DadataSuggestion;
  private partyRequisitesSuggestion: PartySuggestion;
  counterPartyForm: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.counterPartyForm = this.fb.group({
      'counterName': ['', Validators.required],
      'counterActive': [true]
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
      this.onNewCounterpartySaved.emit(this.newCounterparty);
    } else {
      this.newCounterparty.name = this.counterPartyForm.get('counterName').value;
      this.newCounterparty.active = this.counterPartyForm.get('counterActive').value;
      this.newCounterparty.suggestion = this.partyRequisitesSuggestion;
      this.newCounterparty.id = this.counterparty.id;
      this.newCounterparty.version = this.counterparty.version;
      this.onEditedCounterpartySave.emit(this.newCounterparty);
    }

    this.onCloseDialog.emit(false);
  }


  closeDialog() {
    this.onCloseDialog.emit(false);
  }

  onAddressSelected(event: DadataSuggestion) {
    this.counterPartyForm.patchValue({'counterName': event.value});
    this.party = event;
  }

  initAfterViewFormValues(fields: { [key: string]: any }[]): void {
    fields.forEach(field => {
      this.counterPartyForm.patchValue({...field});
    })
  }

  newResetForm(): void {
    this.initAfterViewFormValues([
      {'counterName': null},
      {'counterActive': true}
    ]);
  }

  afterShow(): void {
    if (!this.isNew) {
      this.initAfterViewFormValues([
        {'counterName': this.counterparty.name},
        {'counterActive': this.counterparty.active}
      ]);
    } else {
      this.newResetForm();
    }


  }
  onPartyRequisitesSaved(e){

    this.partyRequisitesSuggestion = e;

  }

}

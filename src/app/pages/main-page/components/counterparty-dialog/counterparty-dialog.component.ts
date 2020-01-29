import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {DadataAddress, DadataConfig, DadataSuggestion} from "@kolkov/ngx-dadata";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-counterparty-dialog',
  templateUrl: './counterparty-dialog.component.html',
  styleUrls: ['./counterparty-dialog.component.scss']
})
export class CounterpartyDialogComponent implements OnInit {
  @Input() counterparty;
  @Input() display;
  @Input() isNew;
  @Input() dadataConfig: DadataConfig;
  @Output() onEditedCounterpartySave = new EventEmitter<any>();
  @Output() onNewCounterpartySaved = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newCounterparty = {};
  private party: DadataSuggestion;
  counterPartyForm: FormGroup;
  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.counterPartyForm = this.fb.group({
      'counterName': ['', Validators.required]
    })

  }

  ngOnInit() {




  }



  counterpartySaved() {

    if (this.isNew) {

      this.newCounterparty = {
        name: this.counterPartyForm.get('counterName').value,
        active: this.counterparty.active,
        suggestion: this.party

      };
      this.onNewCounterpartySaved.emit(this.newCounterparty);
    } else {
      this.newCounterparty = {...this.counterparty};
      this.newCounterparty['name'] = this.counterPartyForm.get('counterName').value;
      this.newCounterparty['suggestion'] = this.party;
      this.onEditedCounterpartySave.emit(this.newCounterparty);
    }

    this.onCloseDialog.emit(false);
  }



  closeDialog() {
    this.onCloseDialog.emit(false);
  }
  onAddressSelected(event: DadataSuggestion) {
    this.counterparty.name = event.value;
    this.party = event;
  }




  afterShow() {

    this.counterPartyForm.patchValue({
      'counterName': this.counterparty.name
    })


  }

}

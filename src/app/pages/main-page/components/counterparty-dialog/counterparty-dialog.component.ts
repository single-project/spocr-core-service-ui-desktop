import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";

@Component({
  selector: 'app-counterparty-dialog',
  templateUrl: './counterparty-dialog.component.html',
  styleUrls: ['./counterparty-dialog.component.scss']
})
export class CounterpartyDialogComponent implements OnInit {
  @Input() counterparty;
  @Input() display;
  @Input() isNew;
  @Output() onEditedCounterpartySave = new EventEmitter<any>();
  @Output() onNewCounterpartySaved = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newCounterparty = {};


  constructor() { }

  ngOnInit() {
  }

  counterpartySaved() {

    if (this.isNew) {

      this.newCounterparty = {
        name: this.counterparty.name,
        active: this.counterparty.active

      };
      this.onNewCounterpartySaved.emit(this.newCounterparty);
    } else {
      this.newCounterparty = {...this.counterparty};
      this.onEditedCounterpartySave.emit(this.newCounterparty);
    }

    this.onCloseDialog.emit(false);
  }



  closeDialog() {
    this.onCloseDialog.emit(false);
  }





  afterShow() {



  }

}

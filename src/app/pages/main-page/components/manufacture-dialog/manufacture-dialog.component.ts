import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-manufacture-dialog',
  templateUrl: './manufacture-dialog.component.html',
  styleUrls: ['./manufacture-dialog.component.scss']
})
export class ManufactureDialogComponent implements OnInit {
  @Input() manufacture;
  @Input() display;
  @Input() isNew;
  @Output() onEditedManufactureSave = new EventEmitter<any>();
  @Output() onNewManufactureSaved = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newManufacture = {};

  constructor() {
  }

  ngOnInit() {
  }

  manufactureSaved() {

    if (this.isNew) {

      this.newManufacture = {
        name: this.manufacture.name,
        active: this.manufacture.active

      };
      this.onNewManufactureSaved.emit(this.newManufacture);
    } else {
      this.newManufacture = {...this.manufacture};
      this.onEditedManufactureSave.emit(this.newManufacture);
    }

    this.onCloseDialog.emit(false);
  }


  closeDialog() {
    this.onCloseDialog.emit(false);
  }


  afterShow() {


  }
}

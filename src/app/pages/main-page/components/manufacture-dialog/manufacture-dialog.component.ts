import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  private manForm: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.manForm = this.fb.group({
      'manName': ['', Validators.required],
      'manActive': [true]
    });
  }

  ngOnInit() {
  }

  manufactureSaved() {

    if (this.isNew) {

      this.newManufacture = {
        name: this.manForm.get('manName').value,
        active: this.manForm.get('manActive').value

      };
      this.onNewManufactureSaved.emit(this.newManufacture);
    } else {
      this.newManufacture = {
        name: this.manForm.get('manName').value,
        active: this.manForm.get('manActive').value,
        version: this.manufacture.version,
        id: this.manufacture.id
      };
      this.onEditedManufactureSave.emit(this.newManufacture);
    }

    this.onCloseDialog.emit(false);
  }

  initAfterViewFormValues(fields: { [key: string]: { prop: any } }[]): void {
    fields.forEach(field => {
      this.manForm.patchValue({...field});
    })
  }

  newResetForm(): void {
    this.initAfterViewFormValues([
      {'manName': null},
      {'manActive': null}
    ]);
  }

  closeDialog() {
    this.onCloseDialog.emit(false);
  }


  afterShow() {
    if (!this.isNew) {
      this.initAfterViewFormValues([
        {'manName': this.manufacture.name},
        {'manActive': this.manufacture.active}
      ]);
    } else {
      this.newResetForm();
    }

  }
}

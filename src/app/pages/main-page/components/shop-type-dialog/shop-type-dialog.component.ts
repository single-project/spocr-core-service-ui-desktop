import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {IdNameModel} from "../../../../core/models/id-name.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-shop-type-dialog',
  templateUrl: './shop-type-dialog.component.html',
  styleUrls: ['./shop-type-dialog.component.scss']
})
export class ShopTypeDialogComponent implements OnInit {
  @Input() shopType;
  @Input() display;
  @Input() manufactureList;
  @Input() isNew;
  @Output() onEditedShopTypeSave = new EventEmitter<any>();
  @Output() onNewShopTypeSaved = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newShopType = {};
  private shopTypeForm: FormGroup;


  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.shopTypeForm = this.fb.group({
      'shopTypeName': ['', Validators.required],
      'shopTypeActive': [true],
      'manufacture': [{}]
    })
  }

  ngOnInit() {

  }

  shopTypeSave() {

    console.dir(this.shopType);
    if (this.isNew) {

      this.newShopType = {
        ...this.newShopType,
        name: this.shopTypeForm.get('shopTypeName').value,
        active: this.shopTypeForm.get('shopTypeActive').value,
        manufacturer: {id: this.shopTypeForm.get('manufacture').value['id']}
      };
      this.onNewShopTypeSaved.emit(this.newShopType);
    } else {
      this.newShopType = {
        ...this.newShopType,
        id: this.shopType.id,
        name: this.shopTypeForm.get('shopTypeName').value,
        active: this.shopTypeForm.get('shopTypeActive').value,
        manufacturer: {id: this.shopTypeForm.get('manufacture').value['id']},
        version: this.shopType.version


      };
      this.onEditedShopTypeSave.emit(this.newShopType);
    }

    this.onCloseDialog.emit(false);
  }


  closeDialog() {
    this.onCloseDialog.emit(false);
  }

  initAfterViewFormValues(fields: { [key: string]: { prop: any } }[]): void {
    fields.forEach(field => {
      this.shopTypeForm.patchValue({...field});
    })
  }

  newResetForm(): void{
    this.initAfterViewFormValues([
      {'shopTypeName': null},
      {'manufacture': null},
      {'shopTypeActive': null}
    ]);
  }
  typesChange() {

  }


  afterShow() {
    if(!this.isNew){
      this.initAfterViewFormValues([
        {'shopTypeName': this.shopType['name']},
        {'manufacture': this.shopType['manufacturer']},
        {'shopTypeActive': this.shopType['active']}
      ]);
    }else{
      this.newResetForm();
    }

  }
}

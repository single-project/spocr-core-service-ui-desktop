import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IdNameModel} from "../../../../core/models/id-name.model";


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
  private manufactureForLabels: IdNameModel[];
  private selectedManufactures: IdNameModel[] = [];

  constructor() {
  }

  ngOnInit() {

  }

  shopTypeSave() {

    console.dir(this.shopType);
    if (this.isNew) {

      this.newShopType = {
        ...this.newShopType,
          name: this.shopType.name,
          active: this.shopType.active,
          manufacturer: {id: this.selectedManufactures[0].id}
      };
      this.onNewShopTypeSaved.emit(this.newShopType);
    } else {
      this.newShopType = {
        ...this.newShopType,
        id: this.shopType.id,
        name: this.shopType.name,
        active: this.shopType.active,
        manufacturer: {id: this.selectedManufactures[0].id},
        version: this.shopType.version


      };
      this.onEditedShopTypeSave.emit(this.newShopType);
    }

    this.onCloseDialog.emit(false);
  }


  closeDialog() {
    this.onCloseDialog.emit(false);
  }

  typesChange(){
    console.dir(this.selectedManufactures);
  }



  afterShow() {
    console.dir(this.manufactureForLabels);
    if( this.selectedManufactures !== []){
      this.selectedManufactures = [];
      this.selectedManufactures.push(this.shopType.manufacturer);
    }
    if(this.isNew){
      this.selectedManufactures = []
    }


    this.manufactureForLabels = this.manufactureList;


  }
}

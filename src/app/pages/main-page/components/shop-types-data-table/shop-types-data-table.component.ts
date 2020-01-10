import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ShopModel} from "../../../../core/models/shop.model";

@Component({
  selector: 'app-shop-types-data-table',
  templateUrl: './shop-types-data-table.component.html',
  styleUrls: ['./shop-types-data-table.component.scss']
})
export class ShopTypesDataTableComponent implements OnInit, OnChanges {
  @Input() dataItems: [];
  @Input() loading: boolean;
  @Input() manufactureList: [];
  @Output() shopTypeEdited = new EventEmitter<any>();
  @Output() manufactureListLoad = new EventEmitter<any>();
  @Output() shopTypeNew= new EventEmitter<any>();
  private displayShopTypeEditDialog: boolean;
  private selectedShopType;
  private isNewShopType: boolean;
  private shopType: any = {};
  constructor() { }

  cols: any[];
  selectedCols: any[];

  ngOnInit() {
    this.manufactureListLoad.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {


    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'name', header: 'Имя'},
      {field: 'manufactureName', header: 'Производитель'},
      {field: 'active', header: 'Активный'},
    ];
    this.selectedCols = this.cols;

  }

  onRowSelect(e) {
    this.isNewShopType = false;
    this.shopType = this.cloneEntity(e.data);
    console.log(this.shopType);
    this.displayShopTypeEditDialog = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;


  }

  onShopTypeEditSave(e) {
    this.shopTypeEdited.emit(e);
    this.displayShopTypeEditDialog = false;
    this.shopType = null;

  }

  onNewShopTypeSave(e){
    this.shopTypeNew.emit(e);
  }





  onCloseShopDialog(e) {
    this.displayShopTypeEditDialog = e;
    this.shopType = null;
  }

  onShopTypeCreate(){
    this.isNewShopType = true;
    this.shopType = {active: true};
    this.displayShopTypeEditDialog = true;

  }
  columnsChange(){
    console.dir(this.selectedCols);
  }

}

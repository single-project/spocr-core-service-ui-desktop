import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ShopModel} from "../../../../core/models/shop.model";
import {CounterpartyModel} from "../../../../core/models/counterparty.model";

@Component({
  selector: 'app-shop-data-table',
  templateUrl: './shop-data-table.component.html',
  styleUrls: ['./shop-data-table.component.scss']
})
export class ShopDataTableComponent implements OnInit, OnChanges {


  @Input() dataItems: ShopModel[];
  @Input() loading: boolean;
  @Input() counterpartiesList: [];
  @Input() shopTypesList: [];
  @Output() savedEdited = new EventEmitter<any>();
  @Output() savedNew = new EventEmitter<any>();
  @Output() counterpartiesListSelect = new EventEmitter<any>();
  @Output() shopTypeSelect = new EventEmitter<any>();
  private displayShopEditDialog: boolean;
  private displayCounterpartiesEditDialog: boolean;
  private displayShopTypeEditDialog: boolean;
  private displayManufactureEditDialog: boolean;
  private selectedShop: ShopModel;
  private isNewShop: boolean;
  private shop: any = {};
  private counterPartiesForSelect: [];
  private manufactureForSelect: [];
  private shopTypesForSelect: [];


  cols: any[];
  selectedCols: any[];

  constructor() {
  }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {


    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'name', header: 'Имя'},
      {field: 'counterpartyName', header: 'Контрагент'},
      {field: 'active', header: 'Активный'},
    ];
    this.selectedCols = this.cols;

  }

  onRowSelect(e) {
    this.isNewShop = false;
    this.shop = this.cloneEntity(e.data);
    console.log(this.shop);
    this.displayShopEditDialog = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;


  }

  onShopEditSave(e) {
    this.savedEdited.emit(e);
    this.displayShopEditDialog = false;
    this.shop = null;

  }

  onNewShopSave(e){
    this.savedNew.emit(e);
  }

  onCounterpartiesListSelect() {
    this.counterpartiesListSelect.emit();
  }

  onShopTypeSelect() {
    this.shopTypeSelect.emit();
  }

  onCloseShopDialog(e) {
    this.displayShopEditDialog = e;
    this.shop = null;
  }

  onShopCreate(){
    this.isNewShop = true;
    this.shop = {active: true};
    this.displayShopEditDialog = true;

  }

}

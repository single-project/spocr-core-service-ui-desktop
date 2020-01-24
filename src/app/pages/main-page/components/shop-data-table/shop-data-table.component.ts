import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ShopModel} from "../../../../core/models/shop.model";
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {DadataConfig} from "@kolkov/ngx-dadata";

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
  @Input() dadataAddressConfig: DadataConfig;
  @Output() savedShopEdited = new EventEmitter<any>();
  @Output() savedShopNew = new EventEmitter<any>();
  @Output() counterpartiesListSelect = new EventEmitter<any>();
  @Output() shopTypeSelect = new EventEmitter<any>();
  private displayShopEditDialog: boolean;
  private selectedShop: ShopModel;
  private isNewShop: boolean;
  private shop: any = {};



  cols: any[];
  selectedCols: any[];

  constructor() {
  }

  ngOnInit() {
    this.counterpartiesListSelect.emit();
    this.shopTypeSelect.emit();

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
    this.savedShopEdited.emit(e);
    this.displayShopEditDialog = false;
    this.shop = null;

  }

  onNewShopSave(e){
    this.savedShopNew.emit(e);
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
  columnsChange(){
    console.dir(this.selectedCols);
  }
}

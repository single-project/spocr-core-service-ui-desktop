import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {ShopModel} from "../../../../core/models/shop.model";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {


  @Input() dataItems: ShopModel[] | CounterpartyModel[];
  @Input() DataSetType: number;
  @Input() loading: boolean;
  @Input() counterpartiesList: [];
  @Input() shopTypesList: [];
  @Output() saved = new EventEmitter<any>();
  @Output() counterpartiesListSelect = new EventEmitter<any>();
  @Output() shopTypeSelect = new EventEmitter<any>();
  private displayShopEditDialog: boolean;
  private displayCounterpartiesEditDialog: boolean;
  private displayShopTypeEditDialog: boolean;
  private displayManufactureEditDialog: boolean;
  private selectedEntity: ShopModel | CounterpartyModel;
  private newEntity: boolean;
  private entity: any = {};
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

    if (this.DataSetType === 1) {
      this.cols = [
        {field: 'id', header: 'ID'},
        {field: 'name', header: 'Имя'},
        {field: 'counterpartyName', header: 'Контрагент'},
        {field: 'active', header: 'Активный'},
      ];
      this.selectedCols = this.cols;
    } else if (this.DataSetType === 2 || this.DataSetType === 3) {
      this.cols = [
        {field: 'id', header: 'ID'},
        {field: 'name', header: 'Имя'},
        {field: 'active', header: 'Активный'},
      ];
      this.selectedCols = this.cols;
    }
  }

  onRowSelect(event) {
    this.newEntity = false;
    this.entity = this.cloneEntity(event.data);
    console.log(this.entity);
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
    this.saved.emit(e)
  }

  onCounterpartiesListSelect(){
    this.counterpartiesListSelect.emit();
  }

  onShopTypeSelect(){
    this.shopTypeSelect.emit();
  }

  onCloseShopDialog(e){
    this.displayShopEditDialog = e;
  }


}

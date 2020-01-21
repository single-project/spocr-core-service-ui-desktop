import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ShopModel} from "../../../../core/models/shop.model";
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {DadataConfig} from "@kolkov/ngx-dadata";

@Component({
  selector: 'app-counterparties-data-table',
  templateUrl: './counterparties-data-table.component.html',
  styleUrls: ['./counterparties-data-table.component.scss']
})
export class CounterpartiesDataTableComponent implements OnInit, OnChanges {
  @Input() dataItems: CounterpartyModel[];
  @Input() loading: boolean;
  @Input() dadataConfig: DadataConfig;
  @Output() savedCounterpartyEdited = new EventEmitter<any>();
  @Output() savedCounterpartyNew = new EventEmitter<any>();
  private displayCounterpartyEditDialog: boolean;
  private selectedCounterparty: CounterpartyModel;
  private isNewCounterparty: boolean;
  private counterparty: any = {};

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
      {field: 'active', header: 'Активный'},
    ];
    this.selectedCols = this.cols;

  }

  onRowSelect(e) {
    this.isNewCounterparty = false;
    this.counterparty = this.cloneEntity(e.data);
    console.log(this.counterparty);
    this.displayCounterpartyEditDialog = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;


  }

  onCounterpartyEditSave(e) {

    this.savedCounterpartyEdited.emit(e);
    this.displayCounterpartyEditDialog = false;
    this.counterparty = null;

  }

  onNewCounterpartySave(e){
    this.savedCounterpartyNew.emit(e);
  }





  onCloseCounterpartyDialog(e) {
    this.displayCounterpartyEditDialog = e;
    this.counterparty = null;
  }

  onCounterpartyCreate(){
    this.isNewCounterparty = true;
    this.counterparty = {active: true};
    this.displayCounterpartyEditDialog = true;

  }
  columnsChange(){
    console.dir(this.selectedCols);
  }
}


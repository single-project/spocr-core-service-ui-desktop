import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";

@Component({
  selector: 'app-manufacture-data-table',
  templateUrl: './manufacture-data-table.component.html',
  styleUrls: ['./manufacture-data-table.component.scss']
})
export class ManufactureDataTableComponent implements OnInit {
  @Input() dataItems: [];
  @Input() loading: boolean;
  @Output() savedManufactureEdited = new EventEmitter<any>();
  @Output() savedManufactureNew = new EventEmitter<any>();
  private displayManufactureEditDialog: boolean;
  private selectedManufacture: any;
  private isNewManufacture: boolean;
  private manufacture: any = {};

  cols: any[];
  selectedCols: any[];
  constructor() { }

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
    this.isNewManufacture = false;
    this.manufacture = this.cloneEntity(e.data);
    console.log(this.manufacture);
    this.displayManufactureEditDialog = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;


  }

  onManufactureEditSave(e) {

    this.savedManufactureEdited.emit(e);
    this.displayManufactureEditDialog = false;
    this.manufacture = null;

  }

  onNewManufactureSave(e){
    this.savedManufactureNew.emit(e);
  }





  onCloseManufactureDialog(e) {
    this.displayManufactureEditDialog = e;
    this.manufacture = null;
  }

  onManufactureCreate(){
    this.isNewManufacture = true;
    this.manufacture = {active: true};
    this.displayManufactureEditDialog = true;

  }
  columnsChange(){
    console.dir(this.selectedCols);
  }

}

import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {ConfigService} from "../../../../core/services/config.service";
import {ShopModel} from "../../../../core/models/shop.model";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {


  @Input() dataItems: ShopModel[];
  @Input() DataSetType: number;
  @Input() loading: boolean;
  private displayEditDialog: boolean;
  private selectedEntity: ShopModel | CounterpartyModel;
  private newEntity: boolean;
  private entity: any = {};


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
    } else if (this.DataSetType === 2) {
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
    this.displayEditDialog = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;


  }

}

import {Component, Inject, Input, OnInit} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {ConfigService} from "../../../../core/services/config.service";
import {ShopModel} from "../../../../core/models/shop.model";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {


  @Input() dataItems;
  private displayCrudDialog: boolean;
  private selectedShop: ShopModel;


  cols: any[];
  selectedCols: any[];

  constructor() {
  }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Имя' },
      { field: 'counterparty', header: 'Контрагент' },
      { field: 'active', header: 'Активный' },
    ];
    this.selectedCols = this.cols;

  }

}

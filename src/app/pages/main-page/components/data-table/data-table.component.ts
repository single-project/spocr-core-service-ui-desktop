import {Component, Inject, OnInit} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {ConfigService} from "../../../../core/services/config.service";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  dataItems: CounterpartyModel[] = [
    {
      "id": 1,
      "name": "Оптовый склад табак",
      "active": true,
      "version": 0
    },
    {
      "id": 2,
      "name": "Латариа",
      "active": true,
      "version": 0
    },
    {
      "id": 3,
      "name": "Пересортица",
      "active": true,
      "version": 0
    },
    {
      "id": 4,
      "name": "Недостача на складе (после ревизии)",
      "active": true,
      "version": 0
    },
    {
      "id": 5,
      "name": "Списание СКЛАДСКОЕ",
      "active": true,
      "version": 0
    }
  ];
  cols: any[];
  selectedCols: any[];

  constructor(@Inject(ConfigService) private config: ConfigService) {
  }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Имя' },
      { field: 'active', header: 'Активный' },
    ];
    this.selectedCols = this.cols;
 this.config.fetchConfig().subscribe((data) => {
   console.table(data);
 });

  }

}

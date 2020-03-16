import {Component, OnInit, ViewChildren, QueryList} from '@angular/core';
import {ConfigService} from '../../core/services/config.service';
import {AppTableTypes} from '../../core/models/app-tabe-types.enum';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  searchString: string;
  tableTitle: string;
  dataType: AppTableTypes;

  @ViewChildren('appDataTable') appDataTable: QueryList<any>;

  constructor(
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.setConfiguration(AppTableTypes.SHOP_TABLE_TYPE);
  }

  clearSearch(): void {
    this.searchString = '';
    this.appDataTable
      .toArray()
      .forEach((tableComp) => tableComp.loadTableData());
  }

  onSearched(tableSearch: HTMLInputElement): void {
    this.appDataTable
      .toArray()
      .forEach((tableComp) => tableComp.dataSearch(tableSearch.value));
  }

  setConfiguration(dataType: number): void {
    this.configService
      .fetchAppSettingsByType(dataType)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }

  switchTable(tableType: AppTableTypes) {
    this.configService
      .fetchAppSettingsByType(tableType)
      .subscribe((data) => {
        Object.assign(this, data);
      });
  }
}

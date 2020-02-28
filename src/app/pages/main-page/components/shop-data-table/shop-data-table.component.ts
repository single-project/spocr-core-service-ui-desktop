import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

import {ShopsService} from '../../../../core/services/shops.service';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {AutoComplete, LazyLoadEvent, MessageService, Table} from 'primeng';
import {SearchService} from '../../../../core/services/search.service';
import {ConfigService} from '../../../../core/services/config.service';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ShopModel} from '../../../../core/models/global-reference.model';
import {ShopDialogComponent} from '../shop-dialog/shop-dialog.component';

@Component({
  selector: 'app-shop-data-table',
  templateUrl: './shop-data-table.component.html',
  styleUrls: ['./shop-data-table.component.scss']
})
export class ShopDataTableComponent extends AppDataTableModel implements OnInit {
  private _selectedShop: ShopModel;
  private _shop: any = {};

  @ViewChildren(AutoComplete)
  private tableFilters: QueryList<AutoComplete>;
  @ViewChild('shopDialogComponent', {static: false}) shopDialogComponent: ShopDialogComponent;


  get shop(): any {
    return this._shop;
  }

  set shop(value: any) {
    this._shop = value;
  }

  constructor(
    shopService: ShopsService,
    private search: SearchService,
    private counterPartiesService: CounterpartiesService,
    private shopTypesService: ShopTypesService,
    private mService: MessageService,
    configService: ConfigService,
  ) {
    super(
      configService,
      shopService);
  }

  ngOnInit() {
    this.loading = true;
    this.loadShopsTableHeaders();
    this.initColumnFilter(() => {
      return []
    });

  }


  fetchFilterData(params = {}, fieldName = '') {
    let dataService$ = this.tableDataService.fetchData(params);

    if (fieldName === 'counterparty') {
      dataService$ = this.counterPartiesService
        .fetchCounterPartiesData(params);
    }

    return dataService$;
  }

  onRowSelect(e) {

    this.shop = e.data;
    this.shopDialogComponent._display = true;
    console.log(this.shop);

  }




  onCloseShopDialog(e) {
    this.shopDialogComponent._display = false;
    this.shop = null;
  }

  onShopCreate() {

    this.shop = {active: true};
    this.shopDialogComponent._display = true;
  }

  columnsChange() {
    console.dir(this.selectedCols);
  }


  showServerErrorToast() {
    this.mService.clear();
    this.mService.add({
      key: 'c',
      sticky: true,
      severity: 'error',
      summary: 'Что-то пошло не так. Попробуйте сохранить позже',
      detail: 'Данные не сохранены'
    });
  }

  showSuccessSavingMessage() {
    this.mService.clear();
    this.mService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Данные успешно сохранены'
    });
  }

  addCustomParamAtr(params: Object, event: LazyLoadEvent) {
    Object.entries(event.filters).forEach(
      ([key, filterObj]) => {

        if (key === 'counterparty') {
          if (filterObj.value.id === -1) {
            params[`${key}.name`] = filterObj.value.name;
          } else {
            params[`${key}.id`] = filterObj.value.id;
          }
        } else if (key === 'active') {
          params[key] = filterObj.value.name;

          if (filterObj.value.name.toLowerCase() === 'да') {
            params[key] = true;
          } else if (filterObj.value.name.toLowerCase() === 'нет') {
            params[key] = false;
          }
        } else {
          params[key] = filterObj.value.name;
        }
      });
  }

  dataSearch(searchString: string) {
    this.loadTableData({q: searchString});
  }

  cleanFilter(sdt: Table, index: number, fieldId: string, matchMode: string) {
    const filterObj: AutoComplete = this.tableFilters.toArray()[index];

    filterObj.inputEL.nativeElement.value = '';

    sdt.filter(null, fieldId, matchMode);
  }

  filterSearch(event, fieldName: string) {
    let propName = 'q';
    let propValue = event.query;
    let action$ = (data: any) => {
      return data.content.map(dataObj => (
        {
          id: dataObj.id,
          name: fieldName === 'counterparty' ?
            dataObj.name : dataObj[fieldName]
        }
      ))
    };

    if (fieldName === 'active') {
      propName = 'active';
      if (event.query.toLowerCase() === 'да') {
        propValue = true;
      } else if (event.query.toLowerCase() === 'нет') {
        propValue = false;
      }

      action$ = (data: any) => {
        return [...new Set(data.content.map(
          dataObj => dataObj.active))]
          .map((val) => ({
            id: -1,
            name: val ? 'Да' : 'Нет'
          }))
      };
    }

    this.columnFilterSubj$.next({
      params: {[propName]: propValue},
      fieldName,
      action$
    });
  }





  shopSavedFromDialog(e: ShopModel): void {


    let idx = this.dataItems.findIndex((i) => i.id === e.id);
    console.log('IDX' + idx);
    if (idx !== -1) {
      this.dataItems[idx] = {...e};
      this.showSuccessSavingMessage()
    } else {
      this.dataItems = [...this.dataItems, e];
    }

  }


}

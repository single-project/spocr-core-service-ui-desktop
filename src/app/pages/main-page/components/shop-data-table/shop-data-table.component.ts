import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ReferenceResponseModel} from '../../../../core/models/reference-response.model';
import {ShopsService} from '../../../../core/services/shops.service';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {AutoComplete, LazyLoadEvent, MessageService, Table} from 'primeng';
import {SearchService} from '../../../../core/services/search.service';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ShopColumnModel} from '../../../../core/models/shop-column.model';
import {ShopDialogComponent} from "../shop-dialog/shop-dialog.component";
import {ShopModel} from '../../../../core/models/global-reference.model';

@Component({
  selector: 'app-shop-data-table',
  templateUrl: './shop-data-table.component.html',
  styleUrls: ['./shop-data-table.component.scss']
})
export class ShopDataTableComponent implements OnInit {

  private dataItems: ShopModel[];
  private loading: boolean;
  private counterPartiesList = [];
  private shopTypesList = [];
  private searchItems = [];
  private sortField: string;
  private sortOrder: number;

  private displayShopEditDialog: boolean;
  private selectedShop: ShopModel;
  private shop: any = {};
  private totalElements: number;
  private numberOfElements: number;
  private isFilterShown: boolean;
  private columnFilters$: Observable<any>;
  private columnFilterSubj$ = new Subject();

  private cols: ShopColumnModel[];
  private selectedCols: ShopColumnModel[];
  @ViewChildren(AutoComplete)
  private tableFilters: QueryList<AutoComplete>;
  @ViewChild('shopDialogComponent', {static: false}) shopDialogComponent: ShopDialogComponent;


  constructor(
    private shopService: ShopsService,
    private search: SearchService,
    private counterPartiesService: CounterpartiesService,
    private shopTypesService: ShopTypesService,
    private mService: MessageService,
  ) {
    this.displayShopEditDialog = false;
  }

  ngOnInit() {
    this.loading = true;
    this.loadShopsTableHeaders();
    this.initColumnFilter();
    this.counterPartiesListSelect();
    this.shopTypeSelect();
  }

  initColumnFilter() {
    this.columnFilters$ = this.columnFilterSubj$.pipe(
      debounceTime(1000),
      switchMap(({params, fieldName}) =>
        this.fetchFilterData(params, fieldName)
          .pipe(
            map((data) => {
              let arrayTemp: Array<Object>;
              if (fieldName === 'active') {
                arrayTemp = [...new Set(data.content.map(
                  dataObj => dataObj.active))]
                  .map((val) => ({
                    id: -1,
                    name: val ? 'Да' : 'Нет'
                  }));
              } else {
                arrayTemp = data.content.map(dataObj => (
                  {
                    id: dataObj.id,
                    name: fieldName === 'counterparty' ? dataObj.name : dataObj[fieldName]
                  }
                ));
              }

              return arrayTemp;
            }),
          )),
    );

    this.columnFilters$.subscribe((data) => {
      this.searchItems = [...data];
    });
  }

  fetchFilterData(params = {}, fieldName = '') {
    let dataService$ = this.shopService.fetchShopData(params);

    if (fieldName === 'counterparty') {
      dataService$ = this.counterPartiesService.fetchCounterPartiesData(params);
    }

    return dataService$;
  }

  onRowSelect(e) {

    this.shop = e.data;
    this.shopDialogComponent._display = true;
    console.log(this.shop);

  }


  // onShopEditSave(e) {
  //   this.savedShopEdited(e);
  //   this.shopDialogComponent._display = false;
  //   this.shop = null;
  // }
  //
  // onNewShopSave(e) {
  //   this.savedShopNew(e);
  // }

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

  loadShopsTableHeaders() {
    const tableHeaders = {
      columns: [
        {field: 'id', header: 'ID'},
        {field: 'name', header: 'Имя'},
        {field: 'counterparty', header: 'Контрагент'},
        {field: 'active', header: 'Активный'},
      ],
      sortField: 'name',
      sortOrder: 'asc'
    };


    this.cols = tableHeaders.columns;
    this.selectedCols = this.cols;
    this.sortField = tableHeaders.sortField;
    this.sortOrder = tableHeaders.sortField === 'asc' ? -1 : 1;
  }

  loadShopsData(options = {}, updatePageInfo = true) {
    return this.shopService.fetchShopData(options)
      .subscribe((data: ReferenceResponseModel) => {
        this.dataItems = data.content;

        if (updatePageInfo) {
          this.totalElements = data.totalElements;
          this.numberOfElements = data.numberOfElements;
        }
        this.loading = false;
      });
  }

  loadShopDataLazy(event: LazyLoadEvent) {
    this.loading = true;
    let params = {};

    if (typeof event.first === 'number' && event.rows) {
      params['page'] = event.first / event.rows;
    }

    if (event.sortField) {
      params['sort'] = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
    }

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

    this.loadShopsData(params, true);

  }

  dataSearch(searchString: string) {
    this.loadShopsData({q: searchString});
  }

  cleanFilter(sdt: Table, index: number, fieldId: string, matchMode: string) {
    const filterObj: AutoComplete = this.tableFilters.toArray()[index];

    filterObj.inputEL.nativeElement.value = '';

    sdt.filter(null, fieldId, matchMode);
  }

  filterSearch(event, fieldName: string) {
    let propName = 'q';
    let propValue = event.query;

    if (fieldName === 'active') {
      propName = 'active';
      if (event.query.toLowerCase() === 'да') {
        propValue = true;
      } else if (event.query.toLowerCase() === 'нет') {
        propValue = false;
      }
    }

    this.columnFilterSubj$.next({
      params: {[propName]: propValue},
      fieldName
    });
  }

  counterPartiesListSelect() {
    this.counterPartiesService
      .fetchCounterPartiesData()
      .subscribe((data: ReferenceResponseModel) => {
        this.counterPartiesList = [...data.content];
      });
  }

  shopTypeSelect() {
    this.shopTypesService
      .fetchShopTypesData()
      .subscribe((data: ReferenceResponseModel) => {
        this.shopTypesList = [...data.content];
      });
  }

  shopSavedFromDialog(e: ShopModel): void {
    console.log('event fired');
    console.dir(e);
    let idx = this.dataItems.findIndex((i) => i.id === e.id);
    console.log('IDX' + idx);
    if (idx !== -1) {
      this.dataItems[idx] = {...e};
      this.showSuccessSavingMessage()
    } else {
      this.dataItems = [...this.dataItems, e];
    }

  }

  // savedShopNew(e) {
  //   let idx = this.dataItems.findIndex((i) => i.id === e.id);
  //
  //   this.shopService.newShop(e).subscribe((data) => {
  //     this.dataItems = [...this.dataItems, data];
  //     this.showSuccessSavingMessage()
  //   }, error => {
  //     this.showServerErrorToast();
  //   });
  // }
  //
  // savedShopEdited(e) {
  //   console.dir(e.types);
  //   let idx = this.dataItems.findIndex((i) => i.id === e.id);
  //
  //   this.shopService.editShop(e, e.id).subscribe((data) => {
  //     this.dataItems[idx] = {...data['content']};
  //     this.showSuccessSavingMessage()
  //   }, error => {
  //     this.showServerErrorToast();
  //   })
  // }
}

import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ShopModel} from '../../../../core/models/shop.model';
import {ReferenceResponseModel} from '../../../../core/models/reference-response.model';
import {ShopsService} from '../../../../core/services/shops.service';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {AutoComplete, LazyLoadEvent, MessageService, Table} from 'primeng';
import {SearchService} from '../../../../core/services/search.service';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ShopColumnModel} from '../../../../core/models/shop-column.model';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';

@Component({
  selector: 'app-shop-data-table',
  templateUrl: './shop-data-table.component.html',
  styleUrls: ['./shop-data-table.component.scss']
})
export class ShopDataTableComponent implements OnInit {

  private _dataItems: ShopModel[];
  private _loading: boolean;
  private _counterPartiesList = [];
  private _shopTypesList = [];
  private _searchItems = [];
  private _sortField: string;
  private _sortOrder: number;

  private _displayShopEditDialog: boolean;
  private _selectedShop: ShopModel;
  private _isNewShop: boolean;
  private _shop: any = {};
  private _totalElements: number;
  private _numberOfElements: number;
  private _isFilterShown: boolean;
  private columnFilters$: Observable<any>;
  private columnFilterSubj$ = new Subject();

  private _cols: ShopColumnModel[];
  private _selectedCols: ShopColumnModel[];

  @ViewChildren(AutoComplete)
  private tableFilters: QueryList<AutoComplete>;

  set sortField(sortField: string) {
    this._sortField = sortField;
  }

  get sortField(): string {
    return this._sortField;
  }

  get cols(): ShopColumnModel[] {
    return this._cols;
  }

  set cols(value: ShopColumnModel[]) {
    this._cols = value;
  }

  get selectedCols(): ShopColumnModel[] {
    return this._selectedCols;
  }

  set selectedCols(value: ShopColumnModel[]) {
    this._selectedCols = value;
  }

  get isFilterShown(): boolean {
    return this._isFilterShown;
  }

  set isFilterShown(value: boolean) {
    this._isFilterShown = value;
  }

  get searchItems(): any[] {
    return this._searchItems;
  }

  set searchItems(value: any[]) {
    this._searchItems = value;
  }

  get dataItems(): ShopModel[] {
    return this._dataItems;
  }

  set dataItems(value: ShopModel[]) {
    this._dataItems = value;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get shopTypesList(): any[] {
    return this._shopTypesList;
  }

  set shopTypesList(value: any[]) {
    this._shopTypesList = value;
  }

  get counterPartiesList(): any[] {
    return this._counterPartiesList;
  }

  set counterPartiesList(value: any[]) {
    this._counterPartiesList = value;
  }

  get displayShopEditDialog(): boolean {
    return this._displayShopEditDialog;
  }

  set displayShopEditDialog(value: boolean) {
    this._displayShopEditDialog = value;
  }

  get shop(): any {
    return this._shop;
  }

  set shop(value: any) {
    this._shop = value;
  }

  get selectedShop(): ShopModel {
    return this._selectedShop;
  }

  set selectedShop(value: ShopModel) {
    this._selectedShop = value;
  }

  get sortOrder(): number {
    return this._sortOrder;
  }

  set sortOrder(value: number) {
    this._sortOrder = value;
  }

  get totalElements(): number {
    return this._totalElements;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get numberOfElements(): number {
    return this._numberOfElements;
  }

  set numberOfElements(value: number) {
    this._numberOfElements = value;
  }

  get isNewShop(): boolean {
    return this._isNewShop;
  }

  set isNewShop(value: boolean) {
    this._isNewShop = value;
  }

  constructor(
    private shopService: ShopsService,
    private search: SearchService,
    private counterPartiesService: CounterpartiesService,
    private shopTypesService: ShopTypesService,
    private mService: MessageService,
    private configService: ConfigService,
  ) {
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
    this.savedShopEdited(e);
    this.displayShopEditDialog = false;
    this.shop = null;
  }

  onNewShopSave(e) {
    this.savedShopNew(e);
  }

  onCloseShopDialog(e) {
    this.displayShopEditDialog = e;
    this.shop = null;
  }

  onShopCreate() {
    this.isNewShop = true;
    this.shop = {active: true};
    this.displayShopEditDialog = true;
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
    this.configService
      .fetchTableHeader(AppTableTypes.SHOP_TABLE_TYPE)
      .subscribe((data) => {

        this.cols = data.columns;
        this.selectedCols = data.columns;
        this.sortField = data.sortField;
        this.sortOrder = data.sortOrder === 'asc' ? 1 : -1;
        console.log(data);
      });
  }

  loadTableData(options = {}, updatePageInfo = true) {
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

    this.loadTableData(params, true);

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

  savedShopNew(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);

    this.shopService.newShop(e).subscribe((data) => {
      this.dataItems = [...this.dataItems, data];
      this.showSuccessSavingMessage()
    }, error => {
      this.showServerErrorToast();
    });
  }

  savedShopEdited(e) {
    console.dir(e.types);
    let idx = this.dataItems.findIndex((i) => i.id === e.id);

    this.shopService.editShop(e, e.id).subscribe((data) => {
      this.dataItems[idx] = {...data['content']};
      this.showSuccessSavingMessage()
    }, error => {
      this.showServerErrorToast();
    })
  }
}

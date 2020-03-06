import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ReferenceResponseModel} from '../../../../core/models/reference-response.model';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {ManufactureService} from '../../../../core/services/manufacture.service';
import {AutoComplete, DialogService, LazyLoadEvent, MessageService, Table} from 'primeng';
import {SearchService} from '../../../../core/services/search.service';
import {debounceTime, map, switchMap} from "rxjs/operators";
import {Observable, Subject} from 'rxjs';
import {ShopTypeModel} from "../../../../core/models/global-reference.model";
import {ShopTypeDialogComponent} from "../shop-type-dialog/shop-type-dialog.component";

@Component({
  selector: 'app-shop-types-data-table',
  templateUrl: './shop-types-data-table.component.html',
  styleUrls: ['./shop-types-data-table.component.scss']
})
export class ShopTypesDataTableComponent implements OnInit {
  private _dataItems = [];
  private _loading: boolean;
  private _manufactureList = [];
  private _selectedShopType;
  private _isNewShopType: boolean;
  private _shopType: any = {};
  private _searchItems = [];
  private _totalElements: number;
  private _numberOfElements: number;
  private _isFilterShown: boolean;
  private columnFilters$: Observable<any>;
  private columnFilterSubj$ = new Subject();
  private _sortField: string;
  private _sortOrder: number;

  cols: any[];
  selectedCols: any[];

  @ViewChildren(AutoComplete)
  private tableFilters: QueryList<AutoComplete>;

  get searchItems(): any[] {
    return this._searchItems;
  }

  set searchItems(value: any[]) {
    this._searchItems = value;
  }

  get isFilterShown(): boolean {
    return this._isFilterShown;
  }

  set isFilterShown(value: boolean) {
    this._isFilterShown = value;
  }

  get dataItems(): any[] {
    return this._dataItems;
  }

  set dataItems(value: any[]) {
    this._dataItems = value;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get numberOfElements(): number {
    return this._numberOfElements;
  }

  set numberOfElements(value: number) {
    this._numberOfElements = value;
  }

  get totalElements(): number {
    return this._totalElements;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get sortField(): string {
    return this._sortField;
  }

  set sortField(value: string) {
    this._sortField = value;
  }

  get sortOrder(): number {
    return this._sortOrder;
  }

  set sortOrder(value: number) {
    this._sortOrder = value;
  }

  get shopType(): any {
    return this._shopType;
  }

  set shopType(value: any) {
    this._shopType = value;
  }

  get manufactureList(): any[] {
    return this._manufactureList;
  }

  set manufactureList(value: any[]) {
    this._manufactureList = value;
  }

  get isNewShopType(): boolean {
    return this._isNewShopType;
  }

  set isNewShopType(value: boolean) {
    this._isNewShopType = value;
  }

  get selectedShopType() {
    return this._selectedShopType;
  }

  set selectedShopType(value) {
    this._selectedShopType = value;
  }

  constructor(
    private shopTypesService: ShopTypesService,
    private manufactureService: ManufactureService,
    private mService: MessageService,
    private search: SearchService,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.loadShopsTableHeaders();
    this.initColumnFilter();
    this.manufactureListLoad();
  }

  initColumnFilter() {
    this.columnFilters$ = this.columnFilterSubj$.pipe(
      debounceTime(1000),
      switchMap(({params, fieldName}) =>
        this.fetchFilterData(params, fieldName)
        .pipe(
          map((data: any) => {
            let arrayTemp: Array<Object>;
            if (fieldName === 'active') {
              arrayTemp = [...new Set(data.content.map(
                dataObj => dataObj.active))]
              .map((val) => ({
                id: -1,
                name: val ? 'Да' : 'Нет'
              }));
            } else {
              arrayTemp = data.content.map(dataObj => {
                return {
                  id: dataObj.id,
                  name: fieldName === 'manufacturer' ? dataObj.name : dataObj[fieldName]
                };
              });
            }
            return arrayTemp;
          }),
        )
      ),
    );

    this.columnFilters$.subscribe((data) => {
      this.searchItems = [...data];
    });
  }

  fetchFilterData(params = {}, fieldName = '') {
    let dataService$ = this.shopTypesService.get(params);

    if (fieldName === 'manufacturer') {
      dataService$ = this.manufactureService.fetchManufacturesData(params);
    }

    return dataService$;
  }

  onRowSelect(e) {
    this.isNewShopType = false;
    let shopType = e.data;

    this.openShopTypeDialog(shopType);
  }

  private openShopTypeDialog(shopType) {
    let header = shopType ? shopType.name : 'Новый Тип Магазина';
    const ref = this.dialogService.open(ShopTypeDialogComponent, {
      data: {entity: shopType, entityKey: 'shop-type'},
      header: header,
      width: '70%',
    });

    ref.onClose.subscribe((e: boolean) => {
      if (e) {
        console.log("need to refresh page");
      } else {
        console.log("no need to refresh page");
      }
    });
  }

  onShopTypeEditSave(e) {
    this.shopTypeEdited(e);
    this.shopType = null;
  }

  onNewShopTypeSave(e) {
    this.shopTypeNew(e);
  }

  onShopTypeCreate() {
    this.openShopTypeDialog(null);
  }

  columnsChange() {
    console.dir(this.selectedCols);
  }

  dataSearch(searchString: string) {
    this.search.shopTypeSearch(searchString).subscribe((data: ReferenceResponseModel<ShopTypeModel>) => {
      this.dataItems = this.shopTypesDataTransformHelper(data);
    });
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

  shopTypesDataTransformHelper(rawData: any) {
    const newData = [];
    rawData.content.forEach((d) => {
      d.manufactureName = d.manufacturer.name;
      d.manufactureId = d.manufacturer.id;
      newData.push(d)
    });
    return newData;
  }

  shopTypesSingleTransformHelper(rawData: any): any {

    let newData = {...rawData};
    newData.manufactureName = rawData.manufacturer.id;
    newData.manufactureName = rawData.manufacturer.name;
    return newData;
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
    this.mService.add({key: 'tc', severity: 'success', summary: 'Данные успешно сохранены'});
  }

  shopTypeEdited(e) {
    console.dir;
    let idx = this.dataItems.findIndex((i) => i.id === e.id);

    this.shopTypesService.patch(e).subscribe((data) => {
      this.dataItems[idx] = {...this.shopTypesSingleTransformHelper(data)};
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }

  shopTypeNew(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);

    this.shopTypesService.post(e).subscribe((data) => {
      this.dataItems = [...this.dataItems, this.shopTypesSingleTransformHelper(data)];
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    });
  }

  loadTableData(options = {}, updatePageInfo = true): void {
    this.loading = true;
    this.shopTypesService.get(options)
    .subscribe((data: ReferenceResponseModel<ShopTypeModel>) => {
      this.dataItems = data.content;

      if (updatePageInfo) {
        this.totalElements = data.totalElements;
        this.numberOfElements = data.numberOfElements;
      }
      this.loading = false;
    });
  }

  loadShopTypesDataLazy(event: LazyLoadEvent) {
    const params = {};

    if (typeof event.first === 'number' && event.rows) {
      params['page'] = event.first / event.rows;
    }

    if (event.sortField) {
      params['sort'] = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
    }

    Object.entries(event.filters).forEach(
      ([key, filterObj]) => {

        if (key === 'manufacturer') {
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

  loadShopsTableHeaders() {
    const tableHeaders = {
      columns: [
        {field: 'id', header: 'ID'},
        {field: 'name', header: 'Имя'},
        {field: 'manufacturer', header: 'Производитель'},
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

  manufactureListLoad() {
    this.manufactureService.fetchManufacturesData()
    .subscribe((data: ReferenceResponseModel<ShopTypeModel>) => {
      this.manufactureList = [...data.content];
    });
  }
}

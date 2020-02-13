import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ReferenceResponseModel} from '../../../../core/models/reference-response.model';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {ManufactureService} from '../../../../core/services/manufacture.service';
import {AutoComplete, LazyLoadEvent, MessageService, Table} from 'primeng';
import {SearchService} from '../../../../core/services/search.service';
import {debounceTime, map, switchMap} from "rxjs/operators";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-shop-types-data-table',
  templateUrl: './shop-types-data-table.component.html',
  styleUrls: ['./shop-types-data-table.component.scss']
})
export class ShopTypesDataTableComponent implements OnInit {
  private dataItems = [];
  private loading: boolean;
  private manufactureList = [];
  private displayShopTypeEditDialog: boolean;
  private selectedShopType;
  private isNewShopType: boolean;
  private shopType: any = {};
  private searchItems = [];
  private totalElements: number;
  private numberOfElements: number;
  private isFilterShown: boolean;
  private columnFilters$: Observable<any>;
  private columnFilterSubj$ = new Subject();
  private sortField: string;
  private sortOrder: number;
  @ViewChildren(AutoComplete)
  private tableFilters: QueryList<AutoComplete>;

  constructor(
    private shopTypesService: ShopTypesService,
    private manufactureService: ManufactureService,
    private mService: MessageService,
    private search: SearchService,
  ) {
  }

  cols: any[];
  selectedCols: any[];

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
                    name: fieldName === 'manufacturer'? dataObj.name: dataObj[fieldName]
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
    let dataService$ = this.shopTypesService.fetchShopTypesData(params);

    if (fieldName === 'manufacturer') {
      dataService$ = this.manufactureService.fetchManufacturesData(params);
    }

    return dataService$;
  }

  onRowSelect(e) {
    this.isNewShopType = false;
    this.shopType = this.cloneEntity(e.data);
    console.log(this.shopType);
    this.displayShopTypeEditDialog = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;
  }

  onShopTypeEditSave(e) {
    this.shopTypeEdited(e);
    this.displayShopTypeEditDialog = false;
    this.shopType = null;
  }

  onNewShopTypeSave(e) {
    this.shopTypeNew(e);
  }

  onCloseShopDialog(e) {
    this.displayShopTypeEditDialog = e;
    this.shopType = null;
  }

  onShopTypeCreate() {
    this.isNewShopType = true;
    this.shopType = {active: true};
    this.displayShopTypeEditDialog = true;
  }

  columnsChange() {
    console.dir(this.selectedCols);
  }

  dataSearch(searchString: string) {
    this.search.shopTypeSearch(searchString).subscribe((data: ReferenceResponseModel) => {
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

    this.shopTypesService.editShopType(e, e.id).subscribe((data) => {
      this.dataItems[idx] = {...this.shopTypesSingleTransformHelper(data)};
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }

  shopTypeNew(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);

    this.shopTypesService.newShopType(e).subscribe((data) => {
      this.dataItems = [...this.dataItems, this.shopTypesSingleTransformHelper(data)];
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    });
  }

  loadShopTypesData(options = {}, updatePageInfo = true): void {
    this.loading = true;
    this.shopTypesService.fetchShopTypesData(options)
      .subscribe((data: ReferenceResponseModel) => {
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

    this.loadShopTypesData(params, true);

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
      .subscribe((data: ReferenceResponseModel) => {
        this.manufactureList = [...data.content];
      });
  }
}

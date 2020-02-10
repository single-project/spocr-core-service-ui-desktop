import {Component, OnInit} from '@angular/core';
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

  constructor(
    private shopTypesService: ShopTypesService,
    private manufactureService: ManufactureService,
    private mService: MessageService,
    private search: SearchService,
  ) {
    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'name', header: 'Имя'},
      {field: 'manufacturer', header: 'Производитель'},
      {field: 'active', header: 'Активный'},
    ];
    this.selectedCols = this.cols;
  }

  cols: any[];
  selectedCols: any[];

  ngOnInit() {
    this.initColumnFilter();
    this.loadShopTypesData();
    this.manufactureListLoad();
  }

  initColumnFilter() {
    this.columnFilters$ = this.columnFilterSubj$.pipe(
      debounceTime(1000),
      switchMap(({params, fieldName}) =>
        this.shopTypesService.fetchShopTypesData(params)
          .pipe(
            map((data: any) => {
              return data.content.map(shopTypeObj => {
                return {
                  id: fieldName === 'manufacturer'? shopTypeObj[fieldName]['id']: shopTypeObj.id,
                  name: fieldName === 'manufacturer'? shopTypeObj[fieldName]['name']: shopTypeObj[fieldName]
                };
              });
            }),
          )
      ),
    );

    this.columnFilters$.subscribe((data) => {
      this.searchItems = [...data];
    });
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

  onNewShopTypeSave(e){
    this.shopTypeNew(e);
  }

  onCloseShopDialog(e) {
    this.displayShopTypeEditDialog = e;
    this.shopType = null;
  }

  onShopTypeCreate(){
    this.isNewShopType = true;
    this.shopType = {active: true};
    this.displayShopTypeEditDialog = true;
  }

  columnsChange(){
    console.dir(this.selectedCols);
  }

  dataSearch (searchString: string) {
    this.search.shopTypeSearch(searchString).subscribe((data: ReferenceResponseModel) => {
      this.dataItems = this.shopTypesDataTransformHelper(data);
    });
  }

  cleanFilter(sdt: Table, element: AutoComplete, fieldId: string, matchMode: string) {
    element.inputFieldValue = '';
    sdt.filter(null, fieldId, matchMode);
  }

  filterSearch(event, fieldName) {
    this.columnFilterSubj$.next({
      params: {q: event.query},
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

    if (event.rows) {
      const params = {};

      if (Object.entries(event.filters).length === 0) {
        params['page'] = event.first / event.rows;
      }

      if (event.sortField) {
        params['sort'] = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
      }

      Object.entries(event.filters).forEach(
        ([key, filterObj]) => {
          params[key] = filterObj.value.name;
        });

      this.loadShopTypesData(params, false);
    }
  }

  manufactureListLoad() {
    this.manufactureService.fetchManufacturesData()
      .subscribe((data: ReferenceResponseModel) => {
      this.manufactureList = [...data.content];
    });
  }
}

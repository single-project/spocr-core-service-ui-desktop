import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ManufactureService} from '../../../../core/services/manufacture.service';
import {AutoComplete, LazyLoadEvent, MessageService, Table} from 'primeng';
import {ReferenceResponseModel} from '../../../../core/models/reference-response.model';
import {SearchService} from '../../../../core/services/search.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {ManufacturerModel} from "../../../../core/models/global-reference.model";

@Component({
  selector: 'app-manufacture-data-table',
  templateUrl: './manufacture-data-table.component.html',
  styleUrls: ['./manufacture-data-table.component.scss']
})
export class ManufactureDataTableComponent implements OnInit {

  private _dataItems = [];
  private _searchItems = [];
  private _loading: boolean;
  private _displayManufactureEditDialog: boolean;
  private _selectedManufacture: any;
  private _isNewManufacture: boolean;
  private _manufacture: any = {};

  cols: any[];
  selectedCols: any[];
  private _totalElements: number;
  private _numberOfElements: number;
  private _isFilterShown: boolean;
  private columnFilters$: Observable<any>;
  private columnFilterSubj$ = new Subject();
  private _sortField: string;
  private _sortOrder: number;

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

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get dataItems(): any[] {
    return this._dataItems;
  }

  set dataItems(value: any[]) {
    this._dataItems = value;
  }

  get numberOfElements(): number {
    return this._numberOfElements;
  }

  set numberOfElements(value: number) {
    this._numberOfElements = value;
  }

  get sortField(): string {
    return this._sortField;
  }

  set sortField(value: string) {
    this._sortField = value;
  }

  get totalElements(): number {
    return this._totalElements;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get sortOrder(): number {
    return this._sortOrder;
  }

  set sortOrder(value: number) {
    this._sortOrder = value;
  }

  get manufacture(): any {
    return this._manufacture;
  }

  set manufacture(value: any) {
    this._manufacture = value;
  }

  get displayManufactureEditDialog(): boolean {
    return this._displayManufactureEditDialog;
  }

  set displayManufactureEditDialog(value: boolean) {
    this._displayManufactureEditDialog = value;
  }

  get isNewManufacture(): boolean {
    return this._isNewManufacture;
  }

  set isNewManufacture(value: boolean) {
    this._isNewManufacture = value;
  }

  get selectedManufacture(): any {
    return this._selectedManufacture;
  }

  set selectedManufacture(value: any) {
    this._selectedManufacture = value;
  }

  constructor(
    private manufactureService: ManufactureService,
    private mService: MessageService,
    private search: SearchService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.loadShopsTableHeaders();
    this.initColumnFilter();
  }

  initColumnFilter() {
    this.columnFilters$ = this.columnFilterSubj$.pipe(
      debounceTime(1000),
      switchMap(({params, fieldName}) =>
        this.manufactureService.fetchData(params)
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
                arrayTemp = data.content.map(manufactureObj => {
                  return {
                    id: manufactureObj[fieldName],
                    name: manufactureObj[fieldName]
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

  onRowSelect(e) {
    this.isNewManufacture = false;
    this.manufacture = this.cloneEntity(e.data);
    console.log(this.manufacture);
    this.displayManufactureEditDialog = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;
  }

  onManufactureEditSave(e) {

    this.savedManufactureEdited(e);
    this.displayManufactureEditDialog = false;
    this.manufacture = null;

  }

  onNewManufactureSave(e) {
    this.savedManufactureNew(e);
  }

  onCloseManufactureDialog(e) {
    this.displayManufactureEditDialog = e;
    this.manufacture = null;
  }

  onManufactureCreate() {
    this.isNewManufacture = true;
    this.manufacture = {active: true};
    this.displayManufactureEditDialog = true;
  }

  columnsChange() {
    console.dir(this.selectedCols);
  }

  dataSearch(searchString: string) {
    this.search.manufactureSearch(searchString).subscribe((data: ReferenceResponseModel<ManufacturerModel>) => {
      this.dataItems = data.content;
    });
  }

  cleanFilter(sdt: Table, index: number, fieldId: string, matchMode: string) {
    const filterObj: AutoComplete = this.tableFilters.toArray()[index];

    filterObj.inputEL.nativeElement.value = '';

    sdt.filter(null, fieldId, matchMode);
  }

  filterSearch(event, fieldName) {
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

  loadShopsTableHeaders() {
    const tableHeaders = {
      columns: [
        {field: 'id', header: 'ID'},
        {field: 'name', header: 'Имя'},
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

  loadTableData(options = {}, updatePageInfo = true): void {
    this.loading = true;
    this.manufactureService.fetchData(options)
      .subscribe((data: ReferenceResponseModel<ManufacturerModel>) => {
        this.dataItems = data.content;

        if (updatePageInfo) {
          this.totalElements = data.totalElements;
          this.numberOfElements = data.numberOfElements;
        }
        this.loading = false;
      });
  }

  loadManufactureDataLazy(event: LazyLoadEvent) {

    let params = {};

    if (typeof event.first === 'number' && event.rows) {
      params['page'] = event.first / event.rows;
    }

    if (event.sortField) {
      params['sort'] = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
    }

    Object.entries(event.filters).forEach(
      ([key, filterObj]) => {
        params[key] = filterObj.value.name;

        if (key === 'active') {
          params[key] = filterObj.value.name;

          if (filterObj.value.name.toLowerCase() === 'да') {
            params[key] = true;
          } else if (filterObj.value.name.toLowerCase() === 'нет') {
            params[key] = false;
          }
        }
      });

    this.loadTableData(params, true);
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

  savedManufactureEdited(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);
    this.manufactureService.editItem(e, e.id).subscribe(data => {
      this.dataItems[idx] = {...data};
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }

  savedManufactureNew(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);
    this.manufactureService.newItem(e).subscribe(data => {
      this.dataItems = [...this.dataItems, data];
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }
}

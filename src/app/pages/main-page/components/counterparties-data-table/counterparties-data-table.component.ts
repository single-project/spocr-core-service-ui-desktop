import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CounterpartyModel} from '../../../../core/models/counterparty.model';
import {DadataConfig, DadataType} from '@kolkov/ngx-dadata';
import {ReferenceResponseModel} from '../../../../core/models/reference-response.model';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {AutoComplete, LazyLoadEvent, MessageService, Table} from "primeng";
import {SearchService} from '../../../../core/services/search.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {CounterpartyDialogComponent} from '../counterparty-dialog/counterparty-dialog.component';
import {ShopModel} from '../../../../core/models/global-reference.model';

@Component({
  selector: 'app-counterparties-data-table',
  templateUrl: './counterparties-data-table.component.html',
  styleUrls: ['./counterparties-data-table.component.scss']
})
export class CounterpartiesDataTableComponent implements OnInit {
  private _dataItems: CounterpartyModel [];
  private _loading: boolean;


  private _sortField: string;
  private _sortOrder: number;

  private _displayCounterpartyEditDialog: boolean;
  private _selectedCounterparty: CounterpartyModel;
  private _isNewCounterparty: boolean;
  private _counterparty: any = {};

  cols: any[];
  selectedCols: any[];
  private _searchItems = [];
  private _totalElements: number;
  private _numberOfElements: number;
  private _isFilterShown: boolean;
  private columnFilters$: Observable<any>;
  private columnFilterSubj$ = new Subject();
  @ViewChild('counterpartyDialogComponent', {static: false}) counterpartyDialogComponent: CounterpartyDialogComponent;
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

  get dataItems(): CounterpartyModel[] {
    return this._dataItems;
  }

  set dataItems(value: CounterpartyModel[]) {
    this._dataItems = value;
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

  get counterparty(): any {
    return this._counterparty;
  }

  set counterparty(value: any) {
    this._counterparty = value;
  }

  get displayCounterpartyEditDialog(): boolean {
    return this._displayCounterpartyEditDialog;
  }

  set displayCounterpartyEditDialog(value: boolean) {
    this._displayCounterpartyEditDialog = value;
  }

  get isNewCounterparty(): boolean {
    return this._isNewCounterparty;
  }

  set isNewCounterparty(value: boolean) {
    this._isNewCounterparty = value;
  }


  get selectedCounterparty(): CounterpartyModel {
    return this._selectedCounterparty;
  }

  set selectedCounterparty(value: CounterpartyModel) {
    this._selectedCounterparty = value;
  }

  constructor(
    private counterPartiesService: CounterpartiesService,
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
        this.counterPartiesService.fetchCounterPartiesData(params)
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
                arrayTemp = data.content.map(counterpartyObj => {
                  return {
                    id: counterpartyObj[fieldName],
                    name: counterpartyObj[fieldName]
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
    this.isNewCounterparty = false;
    this.counterparty = this.cloneEntity(e.data);
    console.log(this.counterparty);
    this.counterpartyDialogComponent._display = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;
  }

  onCounterpartyEditSave(e) {
    this.savedCounterPartyEdited(e);
    this.counterpartyDialogComponent._display = false;
    this.counterparty = null;
  }

  onNewCounterpartySave(e) {
    this.savedCounterPartyNew(e);
  }

  onCloseCounterpartyDialog(e) {
    this.displayCounterpartyEditDialog = e;
    this.counterparty = null;
  }

  onCounterpartyCreate() {
    this.isNewCounterparty = true;
    this.counterparty = {active: true};
    this.counterpartyDialogComponent._display = true;

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
    this.mService.add({key: 'tc', severity: 'success', summary: 'Данные успешно сохранены'});
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

  loadCounterPartiesData(options = {}, updatePageInfo = true): void {
    this.loading = true;
    this.counterPartiesService.fetchCounterPartiesData(options)
      .subscribe((data: ReferenceResponseModel) => {
        this.dataItems = [...data.content];

        if (updatePageInfo) {
          this.totalElements = data.totalElements;
          this.numberOfElements = data.numberOfElements;
        }

        this.loading = false;
      });
  }

  loadCounterPartiesDataLazy(event: LazyLoadEvent) {
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

    this.loadCounterPartiesData(params, true);
  }

  dataSearch(searchString: string) {
    this.search.counterpartiesSearch(searchString).subscribe((data: ReferenceResponseModel) => {
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

  savedCounterPartyNew(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);

    this.counterPartiesService.newCounterparty(e).subscribe(data => {
      this.dataItems = [...this.dataItems, data];
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }

  savedCounterPartyEdited(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);

    this.counterPartiesService.editCounterparty(e, e.id).subscribe(
      (data) => {
        this.dataItems[idx] = {...data};
        this.showSuccessSavingMessage();
      },
      error => {
        this.showServerErrorToast();
      }
    )
  }

  counterpartySavedFromDialog(e: CounterpartyModel): void {
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


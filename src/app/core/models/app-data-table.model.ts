import {ConfigService} from '../services/config.service';
import {AppTableTypes} from './app-tabe-types.enum';
import {ReferenceResponseModel} from './reference-response.model';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {LazyLoadEvent} from 'primeng';

export abstract class AppDataTableModel implements AppDataTableModelI {

  private _loading: boolean;

  private _sortField: string;
  private _sortOrder: number;
  private _totalElements: number;
  private _numberOfElements: number;

  private _cols: Object[];
  private _selectedCols: Object[];
  private _isFilterShown: boolean;

  private _dataItems: Object[];

  private columnFilters$: Observable<any>;
  protected columnFilterSubj$ = new Subject();
  private searchItems = [];

  get isFilterShown(): boolean {
    return this._isFilterShown;
  }

  set isFilterShown(value: boolean) {
    this._isFilterShown = value;
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

  get selectedCols(): Object[] {
    return this._selectedCols;
  }

  set selectedCols(value: Object[]) {
    this._selectedCols = value;
  }

  get cols(): Object[] {
    return this._cols;
  }

  set cols(value: Object[]) {
    this._cols = value;
  }

  get dataItems(): any[] {
    return this._dataItems;
  }

  set dataItems(value: any[]) {
    this._dataItems = value;
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

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  protected constructor(
    protected configService: ConfigService,
    protected tableDataService: any,
  ) {
  }

  loadShopsTableHeaders() {
    this.configService
      .fetchTableHeader(AppTableTypes.SHOP_TABLE_TYPE)
      .subscribe((data) => {

        this.cols = data.columns;
        this.selectedCols = data.columns;
        this.sortField = data.sortField;
        this.sortOrder = data.sortOrder === 'asc' ? 1 : -1;
      });
  }

  loadTableData(options = {}, updatePageInfo = true) {
    return this.tableDataService.fetchData(options)
      .subscribe((data: ReferenceResponseModel) => {
        this.dataItems = data.content;

        if (updatePageInfo) {
          this.totalElements = data.totalElements;
          this.numberOfElements = data.numberOfElements;
        }
        this.loading = false;
      });
  }

  initColumnFilter(
    dataTransformer: (data: any) => Object[]): void {
    this.columnFilters$ = this.columnFilterSubj$.pipe(
      debounceTime(1000),
      switchMap(({params, fieldName, action$}) =>
        this.fetchFilterData(params, fieldName)
          .pipe(
            map(action$),
          )),
    );

    this.columnFilters$.subscribe((data) => {
      this.searchItems = [...data];
    });
  }

  abstract fetchFilterData(
    params: Object, fieldName: string): Observable<any>;

  loadTableDataLazy(event: LazyLoadEvent) {
    this.loading = true;
    let params = {};

    this.addPageParamAtr(params, event);
    this.addCustomParamAtr(params, event);

    this.loadTableData(params, true);

  }

  abstract addCustomParamAtr(params: Object, event: LazyLoadEvent): void;

  addPageParamAtr(params = {}, event: LazyLoadEvent): void {
    if (typeof event.first === 'number' && event.rows) {
      params['page'] = event.first / event.rows;
    }

    if (event.sortField) {
      params['sort'] = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
    }
  };

}

interface AppDataTableModelI {

  initColumnFilter(dataTransformer: (data: any) => Object[]): void;

  fetchFilterData(
    params: Object, fieldName: string): Observable<any>;

  loadShopsTableHeaders(): void;

  loadTableData(
    options: Object, updatePageInfo: boolean): void;

  loadTableDataLazy(event: LazyLoadEvent): void;

  addPageParamAtr(params: Object, event: LazyLoadEvent): void;

  addCustomParamAtr(params: Object, event: LazyLoadEvent): void;

}

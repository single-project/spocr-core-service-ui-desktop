import {ConfigService} from '../services/config.service';
import {AppTableTypes} from './app-tabe-types.enum';
import {ReferenceResponseModel} from './reference-response.model';

export class AppDataTableModel implements AppDataTableModelI {

  private _loading: boolean;

  private _sortField: string;
  private _sortOrder: number;
  private _totalElements: number;
  private _numberOfElements: number;

  private _cols: Object[];
  private _selectedCols: Object[];

  private _dataItems: Object[];

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

  constructor(
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
}

interface AppDataTableModelI {
  loadShopsTableHeaders();

  loadTableData(options: Object, updatePageInfo: boolean);
}

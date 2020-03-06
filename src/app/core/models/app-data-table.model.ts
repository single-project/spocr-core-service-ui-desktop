import {ConfigService} from '../services/config.service';
import {AppTableTypes} from './app-tabe-types.enum';
import {ReferenceResponseModel} from './reference-response.model';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AutoComplete, LazyLoadEvent, Table} from 'primeng';
import {QueryList, ViewChildren} from '@angular/core';
import {MessageService} from 'primeng/api';

export abstract class AppDataTableModel<T> {

  loading: boolean;

  sortField: string;
  sortOrder: number;
  totalElements: number;
  numberOfElements: number;

  cols: Object[];
  selectedCols: Object[];
  isFilterShown: boolean;

  dataItems: Object[];

  private columnFilters$: Observable<any>;
  protected columnFilterSubj$ = new Subject();
  searchItems = [];
  private colFilterFormatter = new TableColFilterFormatterBuilder();
  protected tableReqParamBuilder = new TableRequestParamBuilder();

  @ViewChildren(AutoComplete)
  private tableFilters: QueryList<AutoComplete>;

  protected constructor(
    protected messageService: MessageService,
    protected configService: ConfigService,
    protected tableDataService: any,
  ) {
  }

  onRowSelect(): void {
    this.messageService.clear();
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: 'Данная функция еще не реализована!'
    });
  }

  columnsChange(): void {
    this.messageService.clear();
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: 'Данная функция еще не реализована!'
    });
  }

  onItemCreate(): void {
    this.messageService.clear();
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: 'Данная функция еще не реализована!'
    });
  }

  /**
   *
   * Загружает заголовки таблиц с сервера согласно типа таблицы.
   *
   * @param headerType
   */
  loadShopsTableHeaders(headerType: AppTableTypes) {
    this.configService
      .fetchTableHeader(headerType)
      .subscribe((data) => {

        this.cols = data.columns;
        this.selectedCols = data.columns;
        this.sortField = data.sortField;
        this.sortOrder = data.sortOrder === 'asc' ? 1 : -1;
      });
  }

  /**
   *
   * Осуществляет глобальный поиск данных на сервер,
   * после возвращения результата обновляется содержимое всей
   * таблицы
   *
   * Пример использования функции смотри в {@link MainPageComponent.onSearched}
   *
   * @param searchString
   */
  dataSearch(searchString: string) {
    this.loadTableData({q: searchString});
  }

  loadTableData(options = {}, updatePageInfo = true) {
    return this.tableDataService.fetchData(options)
      .subscribe((data: ReferenceResponseModel<T>) => {
        this.dataItems = data.content;

        if (updatePageInfo) {
          this.totalElements = data.totalElements;
          this.numberOfElements = data.numberOfElements;
        }
        this.loading = false;
      });
  }

  getFieldValue(field: any): any {
    return (typeof field === 'object') ? field.name : field;
  }

  /**
   *
   *
   * @param dataTransformer
   */
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

  /**
   *
   * Очищает значение поля фильтра в заголобке таблицы
   *
   * @param {Table} dt ссылка на таблицу определена в HTML темплейте
   * @param {number} index
   * @param fieldId
   * @param matchMode
   * @returns {void} no return value
   */
  cleanFilter(dt: Table, index: number, fieldId: string, matchMode: string) {
    const filterObj: AutoComplete = this.tableFilters.toArray()[index];

    filterObj.inputEL.nativeElement.value = '';

    dt.filter(null, fieldId, matchMode);
  }

  addPageParamAtr(params = {}, event: LazyLoadEvent): void {
    if (typeof event.first === 'number' && event.rows) {
      params['page'] = event.first / event.rows;
    }

    if (event.sortField) {
      params['sort'] = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
    }
  };

  addCustomParamAtr(params: Object, event: LazyLoadEvent) {
    Object.entries(event.filters).forEach(
      ([key, filterObj]) => {
        Object.assign(params, {
          ...this.tableReqParamBuilder
            .buildParam(key, filterObj.value.id, filterObj.value.name)
        })
      });
  }

  loadTableDataLazy(event: LazyLoadEvent) {
    this.loading = true;
    let params = {};

    this.addPageParamAtr(params, event);
    this.addCustomParamAtr(params, event);

    this.loadTableData(params, true);
  }

  filterSearch(event, fieldName: string): void {
    let colFilterFormatter = this.colFilterFormatter
      .getFilterCelFormatter(fieldName);

    /**
     * При вызове метода next срабатывает
     * функция {@link switchMap} вызываемая из метода
     * {@link initColumnFilter}
     */
    this.columnFilterSubj$.next({
      params: colFilterFormatter.reqParamBuilder(event.query),
      fieldName,
      action$: colFilterFormatter.resParamBuilder
    });
  }

  abstract fetchFilterData(
    params: Object, fieldName: string): Observable<any>;
}

/**
 *
 * Класс предназначен для построения
 * карты функций которые форматируют
 * представление данных в выпадающем сприске
 * фильтра колонок в таблицах
 * @see {ShopDataTableComponent}
 *
 */
class TableColFilterFormatterBuilder {

  private tabCelFilterFormatter = {
    default: {
      reqParamBuilder: (propValue: string) => ({q: propValue}),
      resParamBuilder: (data: any) => {
        return data.content.map(dataObj => (
          {
            id: dataObj.id,
            name: dataObj.name
          }
        ))
      },
    },
    id: {
      reqParamBuilder: (propValue: string) => ({q: propValue}),
      resParamBuilder: (data: any) => {
        return data.content.map(dataObj => (
          {
            id: dataObj.id,
            name: dataObj.id
          }
        ))
      },
    },
    active: {
      reqParamBuilder: (propValue: string) => {
        let param = {active: false};

        if (propValue.toLowerCase() === 'да') {
          param.active = true;
        } else if (propValue.toLowerCase() === 'нет') {
          param.active = false;
        }
        return param;
      },
      resParamBuilder: (data: any) => {
        return [...new Set(data.content.map(
          dataObj => dataObj.active))]
          .map((val) => ({
            id: -1,
            name: val ? 'Да' : 'Нет'
          }))
      },
    }
  };

  getFilterCelFormatter(fieldName: string): any {
    let formatter;
    switch (fieldName) {
      case 'id': {
        formatter = this.tabCelFilterFormatter.id;
        break;
      }
      case 'active': {
        formatter = this.tabCelFilterFormatter.active;
        break;
      }
      default: {
        formatter = this.tabCelFilterFormatter.default;
        break;
      }
    }
    return formatter;
  }
}

/**
 *
 * Используется для выбора метода конвертации
 * параметров параметров запроса для загрузки
 * данных из таблицы. Используется методом
 * {@link addCustomParamAtr}
 *
 */
class TableRequestParamBuilder {
  private paramBuilderMaps = {

    active: (id: number, name: string) => {
      let param = {active: false};
      if (name.toLowerCase() === 'да') {
        param['active'] = true;
      } else if (name.toLowerCase() === 'нет') {
        param['active'] = false;
      }

      return param;
    },

    counterparty: (id: number, name: string) => {
      let param = {};
      if (id === -1) {
        param['counterparty.name'] = name;
      } else {
        param['counterparty.id'] = id;
      }

      return param;
    }
  };

  public buildParam(paramName: string, id: number, name: string) {
    return this.paramBuilderMaps[paramName] &&
      this.paramBuilderMaps[paramName](id, name) ||
      {[paramName]: name};
  }
}

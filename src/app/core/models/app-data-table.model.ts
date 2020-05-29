import {ConfigService} from '../services/config.service';
import {AppTableTypes} from './app-tabe-types.enum';
import {ReferenceResponseModel} from './reference-response.model';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AutoComplete, Calendar, DialogService, LazyLoadEvent, Table} from 'primeng';
import {QueryList, Type, ViewChildren} from '@angular/core';
import {MessageService} from 'primeng/api';
import {IdentifiedEntityService} from '../services/identified-entity.service';
import {CounterpartiesService} from '../services/counterparties.service';
import {MainPageInjector} from '../../pages/main-page/main-page-routing.module';
import {ManufactureService} from '../services/manufacture.service';
import moment from 'moment-timezone';


export abstract class  AppDataTableModel<T> {

  loading: boolean;
  calendarConf: any;
  entityKey: string;
  appTableTypes: AppTableTypes;
  calendarVal: any;
  sortField: string;
  sortOrder: number;
  totalElements: number;
  numberOfElements: number;

  cols: Object[];
  selectedCols: Object[];
  isFilterShown: boolean;

  dataItems: Object[];
  selectedItem: any;

  private columnFilters$: Observable<any>;
  protected columnFilterSubj$ = new Subject();
  searchItems = [];
  private colFilterFormatter = new TableColFilterFormatterBuilder();
  protected tableReqParamBuilder = new TableRequestParamBuilder();
  private filterDataServices: Map<string, any> = new Map();


  @ViewChildren(AutoComplete)
  private tableFilters: QueryList<AutoComplete>;

  /**
   *
   * @param messageService
   * @param configService
   * @param tableDataService
   * @param dialogService
   * @param dialogComponentType
   */
  protected constructor(
    protected messageService: MessageService,
    protected configService: ConfigService,
    protected tableDataService: IdentifiedEntityService<T>,
    protected dialogService?: DialogService,
    protected dialogComponentType?: Type<any>
  ) {
    this.filterDataServices.set(
      'counterparty', MainPageInjector.get(CounterpartiesService));
    this.filterDataServices.set(
      'counterparty1', MainPageInjector.get(CounterpartiesService));
    this.filterDataServices.set(
      'counterparty2', MainPageInjector.get(CounterpartiesService));
    this.filterDataServices.set(
      'manufacturer',  MainPageInjector.get(ManufactureService));
    this.filterDataServices.set(
      'default', this.tableDataService);
  }

  onInit(appTableTypes: AppTableTypes): void {
    this.loading = true;
    this.appTableTypes = appTableTypes;

    this.calendarConf = this.configService.getCalendarConfig();

    this.loadTableHeaders(
      appTableTypes);

    this.initColumnFilter(() => {
      return []
    });
  }

  columnsChange(): void {
    this.messageService.clear();
  }

  notImplementedMessage() {
    this.messageService.clear();
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: 'Данная функция еще не реализована!'
    });
  }

  onRowSelect(dt: Table) {
    if(this.dialogService) {
      this.onItemCreate(dt, this.selectedItem);
    } else {
      this.notImplementedMessage();
    }
  }

  /**
   * Открывает динамическое диалоговое окно
   * [Dynamic Dialog](https://www.primefaces.org/primeng/showcase/#/dynamicdialog)
   * @param dt - код таблицы
   * @param item
   */
  onItemCreate(dt: Table, item?): void {
    if (!this.dialogService) {
      this.notImplementedMessage();
      return;
    }

    let header = item ?  `Диалог- ${item.name}` : 'Диалог'; //TODO нужно в классе базового диалога создать статическое свойство title
    const ref = this.dialogService.open(this.dialogComponentType, {
      data: {entity: item, entityKey: this.entityKey},
      header: header,
      width: '70%',
    });

    ref.onClose.subscribe((e: boolean) => {
      if (e) {
        dt.filter(null, 'dialog', null);
      }
    });
  }

  /**
   *
   * Загружает заголовки таблиц с сервера согласно типа таблицы.
   *
   * @param headerType
   */
  loadTableHeaders(headerType: AppTableTypes) {
    this.configService
      .fetchTableHeader(headerType)
      .subscribe((data) => {
        this.entityKey = data.key;
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
    return this.tableDataService.get(options)
      .subscribe((data: ReferenceResponseModel<T>) => {
        this.dataItems = data.content;

        if (updatePageInfo) {
          this.totalElements = data.totalElements;
          this.numberOfElements = data.numberOfElements;
        }
        this.loading = false;
      },
        (err) => {
          this.dataItems = [];

          if (updatePageInfo) {
            this.totalElements = 0;
            this.numberOfElements = 0;
          }
          console.log(err);
          this.loading = false;

          this.messageService.clear();
          this.messageService.add({
            key: 'tr',
            severity: 'error',
            summary: err.error.message
          });
      });
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
   * @param field - ссылка на элемент
   * @returns {void} no return value
   */
  cleanFilter(dt: Table, index: number, fieldId: string, matchMode: string, field?: any) {
    const filterObj: AutoComplete = this.tableFilters.toArray()[index];

    if (field) {
      field.val = '';
    } else {
      filterObj.inputEL.nativeElement.value = '';
    }

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

  /**
   *
   * Метод вызывается из html темплейта использует библиотеку
   * [moment.js](https://momentjs.com/docs/) для построения отформатированной даты
   * "2020-03-25T13:59:11+0300"
   * moment('10/02/2020', 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ssZZ')
   * moment('10/02/2020', 'DD/MM/YYYY').utc().format('YYYY-MM-DDTHH:mm:ssZZ')
   *
   * @param {string} date
   * @returns {string} - ISO8601 date string [moment ISO8601](https://momentjs.com/docs/#/parsing/string/)
   *
   */
  //TODO: вынести в конфиг формат даты, UTC
  dateFormat(date: string): string{
    let datePart = moment(date, 'DD/MM/YYYY').utc().format('YYYY-MM-DDTHH:mm:ss');
    let tzPart = ' UTC';
    return `${datePart}${tzPart}`;
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

  fetchFilterData(params: Object, fieldName: string): Observable<any> {
    const service = this.filterDataServices.get(fieldName) || this.filterDataServices.get('default');
    return service.get(params);
  }

  openCalendar(calendar: Calendar) {
    calendar.showOverlay();
  }

  onDateSelect(dt: Table, date: Date, col: any) {
    col.val = moment(date).format('DD/MM/YYYY');
    dt.filter({id: -1, name: this.dateFormat(col.val)}, col.field, 'contains');
  }
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
    },
    counterparty1: (id: number, name: string) => {
      let param = {};
      if (id === -1) {
        param['counterparty1.name'] = name;
      } else {
        param['counterparty1.id'] = id;
      }

      return param;
    },
    counterparty2: (id: number, name: string) => {
      let param = {};
      if (id === -1) {
        param['counterparty2.name'] = name;
      } else {
        param['counterparty2.id'] = id;
      }

      return param;
    },
    manufacturer: (id: number, name: string) => {
      let param = {};
      if (id === -1) {
        param['manufacturer.name'] = name;
      } else {
        param['manufacturer.id'] = id;
      }

      return param;
    },
  };

  public buildParam(paramName: string, id: number, name: string) {
    return this.paramBuilderMaps[paramName] &&
      this.paramBuilderMaps[paramName](id, name) ||
      {[paramName]: name};
  }
}

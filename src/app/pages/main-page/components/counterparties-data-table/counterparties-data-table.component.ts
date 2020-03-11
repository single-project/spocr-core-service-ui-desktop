import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ReferenceResponseModel} from '../../../../core/models/reference-response.model';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {AutoComplete, DialogService, LazyLoadEvent, MessageService, Table} from "primeng";
import {SearchService} from '../../../../core/services/search.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {CounterpartyDialogComponent} from '../counterparty-dialog/counterparty-dialog.component';
import {CounterpartyModel} from '../../../../core/models/global-reference.model';
import {ShopTypeDialogComponent} from "../shop-type-dialog/shop-type-dialog.component";


@Component({
  selector: 'app-counterparties-data-table',
  templateUrl: './counterparties-data-table.component.html',
  styleUrls: ['./counterparties-data-table.component.scss']
})
export class CounterpartiesDataTableComponent implements OnInit {
  public dataItems: CounterpartyModel [];
  public loading: boolean;

  public sortField: string;
  public sortOrder: number;

  public counterparty: any = {};
  public selectedCounterparty: any = {};

  cols: any[];
  selectedCols: any[];
  public searchItems = [];
  public totalElements: number;
  public numberOfElements: number;
  public isFilterShown: boolean;
  private columnFilters$: Observable<any>;
  private columnFilterSubj$ = new Subject();

  @ViewChild('counterpartyDialogComponent', {static: false}) counterpartyDialogComponent: CounterpartyDialogComponent;
  @ViewChildren(AutoComplete)
  private tableFilters: QueryList<AutoComplete>;

  constructor(
    private counterPartiesService: CounterpartiesService,
    private mService: MessageService,
    private search: SearchService,
    public dialogService: DialogService
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
        this.counterPartiesService.get(params)
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
    this.openCounterpartyDialog(this.selectedCounterparty);
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
    this.counterPartiesService.get(options)
      .subscribe((data: ReferenceResponseModel<CounterpartyModel>) => {
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
    this.search.counterpartiesSearch(searchString).subscribe((data: ReferenceResponseModel<CounterpartyModel>) => {
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

    this.counterPartiesService.post(e).subscribe(data => {
      this.dataItems = [...this.dataItems, data];
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }

  savedCounterPartyEdited(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);

    this.counterPartiesService.patch(e).subscribe(
      (data) => {
        this.dataItems[idx] = {...data};
        this.showSuccessSavingMessage();
      },
      error => {
        this.showServerErrorToast();
      }
    )
  }


  openCounterpartyDialog(counterparty?) {
    const ref = this.dialogService.open(CounterpartyDialogComponent, {
      data: {entity: counterparty, entityKey: 'counterparty'},
      header: counterparty ? counterparty.name : 'Новый Контрагент',
      width: '70%',
      closeOnEscape: true,

    });

    ref.onClose.subscribe((e: boolean) => {
      if (e) {
        console.log("need to refresh page");
      } else {
        console.log("no need to refresh page");
      }
    });
  }
}


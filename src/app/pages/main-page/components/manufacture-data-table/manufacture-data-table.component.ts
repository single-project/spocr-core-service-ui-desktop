import {Component, OnInit} from '@angular/core';
import {ManufactureService} from '../../../../core/services/manufacture.service';
import {AutoComplete, LazyLoadEvent, MessageService, Table} from 'primeng';
import {ReferenceResponseModel} from '../../../../core/models/reference-response.model';
import {SearchService} from '../../../../core/services/search.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-manufacture-data-table',
  templateUrl: './manufacture-data-table.component.html',
  styleUrls: ['./manufacture-data-table.component.scss']
})
export class ManufactureDataTableComponent implements OnInit {
  private dataItems = [];
  private searchItems = [];
  private loading: boolean;
  private displayManufactureEditDialog: boolean;
  private selectedManufacture: any;
  private isNewManufacture: boolean;
  private manufacture: any = {};

  cols: any[];
  selectedCols: any[];
  private totalElements: number;
  private numberOfElements: number;
  private isFilterShown: boolean;
  private columnFilters$: Observable<any>;
  private columnFilterSubj$ = new Subject();

  constructor(
    private manufactureService: ManufactureService,
    private mService: MessageService,
    private search: SearchService,
  ) {
    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'name', header: 'Имя'},
      {field: 'active', header: 'Активный'},
    ];
    this.selectedCols = this.cols;
  }

  ngOnInit() {
    this.initColumnFilter();
    this.loadManufactureData();
  }

  initColumnFilter() {
    this.columnFilters$ = this.columnFilterSubj$.pipe(
      debounceTime(1000),
      switchMap(({params, fieldName}) =>
        this.manufactureService.fetchManufacturesData(params)
          .pipe(
            map((data) => {
              return data.content.map(manufactureObj => {
                return {
                  id: manufactureObj[fieldName],
                  name: manufactureObj[fieldName]
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
    this.search.manufactureSearch(searchString).subscribe((data: ReferenceResponseModel) => {
      this.dataItems = data.content;
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

  loadManufactureData(options = {}, updatePageInfo = true): void {
    this.loading = true;
    this.manufactureService.fetchManufacturesData(options)
      .subscribe((data: ReferenceResponseModel) => {
        this.dataItems = data.content;

        if (updatePageInfo) {
          this.totalElements = data.totalElements;
          this.numberOfElements = data.numberOfElements;
        }
        this.loading = false;
      });
  }

  loadManufactureDataLazy(event: LazyLoadEvent) {

    if (event.rows) {
      let params = {};

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

      this.loadManufactureData(params, false);
    }
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
    this.manufactureService.editManufacture(e, e.id).subscribe(data => {
      this.dataItems[idx] = {...data};
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }

  savedManufactureNew(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.id);
    this.manufactureService.newManufacture(e).subscribe(data => {
      this.dataItems = [...this.dataItems, data];
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }
}

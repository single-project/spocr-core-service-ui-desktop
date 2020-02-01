import {Component, Inject, OnInit} from '@angular/core';
import {ManufactureService} from "../../../../core/services/manufacture.service";
import {MessageService} from "primeng";
import {ReferenceResponseModel} from "../../../../core/models/reference-response.model";
import {SearchService} from "../../../../core/services/search.service";


@Component({
  selector: 'app-manufacture-data-table',
  templateUrl: './manufacture-data-table.component.html',
  styleUrls: ['./manufacture-data-table.component.scss']
})
export class ManufactureDataTableComponent implements OnInit {
  private dataItems = [];
  private loading: boolean;
  private displayManufactureEditDialog: boolean;
  private selectedManufacture: any;
  private isNewManufacture: boolean;
  private manufacture: any = {};

  cols: any[];
  selectedCols: any[];

  constructor(
    @Inject(ManufactureService) private manufactureService: ManufactureService,
    @Inject(MessageService) private mService: MessageService,
    @Inject(SearchService) private search: SearchService,
    ) {
    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'name', header: 'Имя'},
      {field: 'active', header: 'Активный'},
    ];
    this.selectedCols = this.cols;
  }

  ngOnInit() {
    this.loadManufactureData();
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

  onNewManufactureSave(e){
    this.savedManufactureNew(e);
  }

  onCloseManufactureDialog(e) {
    this.displayManufactureEditDialog = e;
    this.manufacture = null;
  }

  onManufactureCreate(){
    this.isNewManufacture = true;
    this.manufacture = {active: true};
    this.displayManufactureEditDialog = true;
  }

  columnsChange(){
    console.dir(this.selectedCols);
  }

  dataSearch (searchString: string) {
    this.search.manufactureSearch(searchString).subscribe((data: ReferenceResponseModel) => {
      this.dataItems = data.content;
    });
  }

  loadManufactureData(): void {
    this.loading = true;
    this.manufactureService.fetchManufacturesData().subscribe((data: ReferenceResponseModel) => {
      this.dataItems = [...data.content];
      this.loading = false;
    });
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

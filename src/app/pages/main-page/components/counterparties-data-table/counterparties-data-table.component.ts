import {Component, Inject, OnInit} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {DadataConfig, DadataType} from "@kolkov/ngx-dadata";
import {ReferenceResponseModel} from "../../../../core/models/reference-response.model";
import {CounterpartiesService} from "../../../../core/services/counterparties.service";
import {MessageService} from "primeng";
import {SearchService} from "../../../../core/services/search.service";

@Component({
  selector: 'app-counterparties-data-table',
  templateUrl: './counterparties-data-table.component.html',
  styleUrls: ['./counterparties-data-table.component.scss']
})
export class CounterpartiesDataTableComponent implements OnInit {
  private dataItems: CounterpartyModel [];
  private loading: boolean;
  private daDataConfig: DadataConfig  = {
    apiKey: `23c98edeae3d036484034a201a493bb418139a7c`,
    type: DadataType.party
  };
  private displayCounterpartyEditDialog: boolean;
  private selectedCounterparty: CounterpartyModel;
  private isNewCounterparty: boolean;
  private counterparty: any = {};

  cols: any[];
  selectedCols: any[];

  constructor(
    @Inject(CounterpartiesService) private counterPartiesService: CounterpartiesService,
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
    this.loadCounterPartiesData();
  }

  onRowSelect(e) {
    this.isNewCounterparty = false;
    this.counterparty = this.cloneEntity(e.data);
    console.log(this.counterparty);
    this.displayCounterpartyEditDialog = true;
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
    this.displayCounterpartyEditDialog = false;
    this.counterparty = null;
  }

  onNewCounterpartySave(e){
    this.savedCounterPartyNew(e);
  }

  onCloseCounterpartyDialog(e) {
    this.displayCounterpartyEditDialog = e;
    this.counterparty = null;
  }

  onCounterpartyCreate(){
    this.isNewCounterparty = true;
    this.counterparty = {active: true};
    this.displayCounterpartyEditDialog = true;

  }

  columnsChange(){
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

  loadCounterPartiesData(): void {
    this.loading = true;
    this.counterPartiesService.fetchCounterPartiesData().subscribe((data: ReferenceResponseModel) => {
      this.dataItems = [...data.content];
      this.loading = false;
    });
  }

  dataSearch (searchString: string) {
    this.search.counterpartiesSearch(searchString).subscribe((data: ReferenceResponseModel) => {
      this.dataItems = data.content;
    })
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
}


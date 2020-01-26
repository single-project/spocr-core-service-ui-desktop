import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ShopModel} from "../../../../core/models/shop.model";
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {DadataConfig, DadataType} from "@kolkov/ngx-dadata";
import {ReferenceResponseModel} from "../../../../core/models/reference-response.model";
import {ShopsService} from "../../../../core/services/shops.service";
import {CounterpartiesService} from "../../../../core/services/counterparties.service";
import {ShopTypesService} from "../../../../core/services/shop-types.service";
import {MessageService} from "primeng";

@Component({
  selector: 'app-shop-data-table',
  templateUrl: './shop-data-table.component.html',
  styleUrls: ['./shop-data-table.component.scss']
})
export class ShopDataTableComponent implements OnInit, OnChanges {


  private dataItems: ShopModel[];
  private loading: boolean;
  private counterPartiesList = [];
  @Input() shopTypesList: [];
  private daDataAddressConfig: DadataConfig = {
    apiKey: `23c98edeae3d036484034a201a493bb418139a7c`,
    type: DadataType.address
  };
  // @Output() shopTypeSelect = new EventEmitter<any>();
  private displayShopEditDialog: boolean;
  private selectedShop: ShopModel;
  private isNewShop: boolean;
  private shop: any = {};



  cols: any[];
  selectedCols: any[];

  constructor(
    @Inject(ShopsService) private shopService: ShopsService,
    @Inject(CounterpartiesService) private counterPartiesService: CounterpartiesService,
    @Inject(ShopTypesService) private shopTypesService: ShopTypesService,
    @Inject(MessageService) private mService: MessageService,
  ) {
  }

  ngOnInit() {
    this.loadShopsData();
    this.counterPartiesListSelect();
    this.shopTypeSelect();
  }

  ngOnChanges(changes: SimpleChanges): void {


    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'name', header: 'Имя'},
      {field: 'counterpartyName', header: 'Контрагент'},
      {field: 'active', header: 'Активный'},
    ];
    this.selectedCols = this.cols;

  }

  onRowSelect(e) {
    this.isNewShop = false;
    this.shop = this.cloneEntity(e.data);
    console.log(this.shop);
    this.displayShopEditDialog = true;
  }

  cloneEntity(e: any) {
    let entity = {};
    for (let prop in e) {
      entity[prop] = e[prop];
    }
    return entity;


  }

  onShopEditSave(e) {
    this.savedShopEdited(e);
    this.displayShopEditDialog = false;
    this.shop = null;

  }

  onNewShopSave(e){
    this.savedShopNew(e);
  }

  onCloseShopDialog(e) {
    this.displayShopEditDialog = e;
    this.shop = null;
  }

  onShopCreate(){
    this.isNewShop = true;
    this.shop = {active: true};
    this.displayShopEditDialog = true;

  }
  columnsChange(){
    console.dir(this.selectedCols);
  }

  shopDataTransformHelper(rawData: any): ShopModel[] {
    const newData: ShopModel[] = [];
    rawData.content.forEach((d) => {
      d.counterpartyName = d.counterparty.name;
      d.counterpartyId = d.counterparty.id;
      newData.push(d)
    });
    return newData;
  }

  shopTypesDataTransformHelper(rawData: any) {
    const newData = [];
    rawData.content.forEach((d) => {
      d.manufactureName = d.manufacturer.name;
      d.manufactureId = d.manufacturer.id;
      newData.push(d)
    });
    return newData;
  }

  shopSingleTransformHelper(rawData: any): any {

    let newData: ShopModel = {...rawData};
    newData.counterpartyId = rawData.counterparty.id;
    newData.counterpartyName = rawData.counterparty.name;
    return newData;
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

  loadShopsData(): void {
    this.loading = true;
    this.shopService.fetchShopData().subscribe((data: ReferenceResponseModel) => {
      this.dataItems = [...this.shopDataTransformHelper(data)];
      this.loading = false;
    });
  }

  counterPartiesListSelect() {
    this.counterPartiesService.fetchCounterPartiesData().subscribe((data: ReferenceResponseModel) => {
      this.counterPartiesList = [...data.content];
    });
  }

  shopTypeSelect() {
    this.shopTypesService.fetchShopTypesData().subscribe((data: ReferenceResponseModel) => {
      //this.shopTypes = [...this.shopTypesDataTransformHelper(data)];
    });
  }

  savedShopNew(e) {
    let idx = this.dataItems.findIndex((i) => i.id === e.shopData.id);

    this.shopService.newShop(e.shopData).subscribe((data) => {
      this.dataItems = [...this.dataItems, this.shopSingleTransformHelper(data)];
      this.showSuccessSavingMessage()
    }, error => {
      this.showServerErrorToast();
    });
  }

  savedShopEdited(e) {
    console.dir(e.types);
    let idx = this.dataItems.findIndex((i) => i.id === e.shopData.id);

    this.shopService.editShop(e.shopData, e.shopData.id).subscribe((data) => {
      this.dataItems[idx] = {...this.shopSingleTransformHelper(data)};
      this.showSuccessSavingMessage()
    }, error => {
      this.showServerErrorToast();
    })
  }
}

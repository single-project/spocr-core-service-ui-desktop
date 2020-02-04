import {Component, OnInit} from '@angular/core';
import {ShopModel} from "../../../../core/models/shop.model";
import {DadataConfig, DadataType} from "@kolkov/ngx-dadata";
import {ReferenceResponseModel} from "../../../../core/models/reference-response.model";
import {ShopsService} from "../../../../core/services/shops.service";
import {CounterpartiesService} from "../../../../core/services/counterparties.service";
import {ShopTypesService} from "../../../../core/services/shop-types.service";
import {LazyLoadEvent, MessageService} from "primeng";
import {SearchService} from "../../../../core/services/search.service";

@Component({
  selector: 'app-shop-data-table',
  templateUrl: './shop-data-table.component.html',
  styleUrls: ['./shop-data-table.component.scss']
})
export class ShopDataTableComponent implements OnInit {

  private dataItems: ShopModel[];
  private loading: boolean;
  private counterPartiesList = [];
  private shopTypesList = [];
  private daDataAddressConfig: DadataConfig = {
    apiKey: `23c98edeae3d036484034a201a493bb418139a7c`,
    type: DadataType.address
  };

  private displayShopEditDialog: boolean;
  private selectedShop: ShopModel;
  private isNewShop: boolean;
  private shop: any = {};
  private totalElements: number;
  private numberOfElements: number;

  cols: any[];
  selectedCols: any[];

  constructor(
    private shopService: ShopsService,
    private search: SearchService,
    private counterPartiesService: CounterpartiesService,
    private shopTypesService: ShopTypesService,
    private mService: MessageService,
  ) {

    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'name', header: 'Имя'},
      {field: 'counterpartyName', header: 'Контрагент'},
      {field: 'active', header: 'Активный'},
    ];
    this.selectedCols = this.cols;
  }

  ngOnInit() {
    this.loadShopsData();
    this.counterPartiesListSelect();
    this.shopTypeSelect();
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

  onNewShopSave(e) {
    this.savedShopNew(e);
  }

  onCloseShopDialog(e) {
    this.displayShopEditDialog = e;
    this.shop = null;
  }

  onShopCreate() {
    this.isNewShop = true;
    this.shop = {active: true};
    this.displayShopEditDialog = true;
  }

  columnsChange() {
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

  loadShopsData(options = {}) {
    this.loading = true;
    return this.shopService.fetchShopData(options)
      .subscribe((data: ReferenceResponseModel) => {
        this.dataItems = data.content.map((shopObj: ShopModel) => ({
          ...shopObj,
          counterpartyName: shopObj.counterparty.name,
          counterpartyId: shopObj.counterparty.id,
        }));

        this.totalElements = data.totalElements;
        this.numberOfElements = data.numberOfElements;
        this.loading = false;
      });
  }

  loadShopDataLazy(event: LazyLoadEvent) {

    if (event.rows) {
      let params = {};
      params['page'] = event.first / event.rows;

      if (event.sortField) {
        params['sort'] = `${event.sortField},${event.sortOrder === 1 ? 'asc': 'desc'}`;
      }

      this.shopService
        .fetchShopData(params)
        .subscribe(
          (data: ReferenceResponseModel) => {
            this.dataItems = data.content.map((shopObj: ShopModel) => ({
              ...shopObj,
              counterpartyName: shopObj.counterparty.name,
              counterpartyId: shopObj.counterparty.id,
            }));
            this.loading = false;
          });
    }
  }

  dataSearch(searchString: string) {
    this.loadShopsData({q: searchString});
  }

  counterPartiesListSelect() {
    this.counterPartiesService.fetchCounterPartiesData().subscribe((data: ReferenceResponseModel) => {
      this.counterPartiesList = [...data.content];
    });
  }

  shopTypeSelect() {
    this.shopTypesService.fetchShopTypesData().subscribe((data: ReferenceResponseModel) => {
      this.shopTypesList = [...this.shopTypesDataTransformHelper(data)];
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

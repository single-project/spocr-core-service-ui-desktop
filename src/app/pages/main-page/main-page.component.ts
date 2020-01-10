import {Component, Inject, OnInit} from '@angular/core';
import {ShopsService} from "../../core/services/shops.service";
import {ShopModel} from "../../core/models/shop.model";
import {SearchService} from "../../core/services/search.service";
import {ReferenceResponseModel} from "../../core/models/reference-response.model";
import {CounterpartiesService} from "../../core/services/counterparties.service";
import {CounterpartyModel} from "../../core/models/counterparty.model";
import {MessageService} from "primeng";
import {ShopTypesService} from "../../core/services/shop-types.service";
import {ManufactureService} from "../../core/services/manufacture.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private searchString: string;
  private tableTitle: string;
  private tabData: ShopModel[] | CounterpartyModel[];
  private manufatureData: [];
  private counterpartiesData = [];
  private dataType: number;
  private userId: number;
  private loading: boolean;
  private activeChecked: boolean;
  private nonActiveChecked: boolean;
  private clonedTabData;
  private shopTypes = [];


  constructor(
    @Inject(ShopsService) private shopService: ShopsService,
    @Inject(SearchService) private search: SearchService,
    @Inject(CounterpartiesService) private counterpartiesService: CounterpartiesService,
    @Inject(ShopTypesService) private shopTypesService: ShopTypesService,
    @Inject(ManufactureService) private manufactureService: ManufactureService,
    @Inject(MessageService) private mService: MessageService,
  ) {
  }

  ngOnInit() {

    this.userId = 1;
    this.loadShopsData();
    this.activeChecked = false;
    this.nonActiveChecked = false;
    this.clonedTabData = [];

  }

  clearSearch(): void {
    this.searchString = '';
    if (this.dataType === 1) {
      this.loadShopsData();
    } else if (this.dataType === 2) {
      this.loadCounterpartiesData();
    }
  }

  onSearched(): void {
    if (this.dataType === 1) {
      this.search.shopSearch(this.searchString).subscribe((data: ReferenceResponseModel) => {
        this.tabData = this.shopDataTransformHelper(data);
      })
    } else if (this.dataType === 2) {
      this.search.counterpartiesSearch(this.searchString).subscribe((data: ReferenceResponseModel) => {
        this.tabData = data.content;
      })
    }
  }

  loadShopsData(): void {
    this.tableTitle = 'Торговые точки';
    this.dataType = 1;
    this.loading = true;
    this.shopService.fetchShopData().subscribe((data: ReferenceResponseModel) => {

      this.tabData = [...this.shopDataTransformHelper(data)];
      this.loading = false;
    });
  }

  loadCounterpartiesData(): void {
    this.tableTitle = 'Контрагенты';
    this.dataType = 2;
    this.loading = true;
    this.counterpartiesService.fetchCounterPartiesData().subscribe((data: ReferenceResponseModel) => {
      this.tabData = [...data.content];
      this.loading = false;
    });

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



  shopSingleTransformHelper(rawData: any): any {

    let newData: ShopModel = {...rawData};
    newData.counterpartyId = rawData.counterparty.id;
    newData.counterpartyName = rawData.counterparty.name;
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

  shopTypesSingleTransformHelper(rawData: any): any {

    let newData = {...rawData};
    newData.manufactureName = rawData.manufacturer.id;
    newData.manufactureName = rawData.manufacturer.name;
    return newData;
  }

  shopsToggle() {

    this.loadShopsData();
  }

  counterpartiesToggle() {

    this.loadCounterpartiesData();

  }

  activeCheck(e) {
    this.activeChecked = e;
    if (e) {
      this.clonedTabData = [...this.tabData];
      [...this.tabData] = this.tabData.filter((d) => {
        if (!d.active) {
          return d;
        }
      })

    }
    if (!e) {
      [...this.tabData] = this.clonedTabData;
    }
  }

  nonActiveCheck(e) {
    this.nonActiveChecked = e;
    if (e) {
      this.clonedTabData = [...this.tabData];
      [...this.tabData] = this.tabData.filter((d) => {
        if (d.active) {
          return d;
        }
      })

    }
    if (!e) {
      [...this.tabData] = this.clonedTabData;
      this.clonedTabData = [];
    }

  }

  onShopEdited(e) {

      let idx = this.tabData.findIndex((i) => i.id === e.shopData.id);

      this.shopService.editShop(e.shopData, e.shopData.id).subscribe((data) => {
        this.tabData[idx] = {...this.shopSingleTransformHelper(data)};
        this.showSuccessSavingMessage()
      }, error => {
        this.showServerErrorToast();
      })

  }

  onShopNew(e) {

    let idx = this.tabData.findIndex((i) => i.id === e.shopData.id);
    this.shopService.newShop(e.shopData).subscribe((data) => {
      this.tabData[idx] = {...this.shopSingleTransformHelper(data)};
      this.showSuccessSavingMessage()
    }, error => {
      this.showServerErrorToast();
    });

  }

  onShopTypeNew(e) {

  }

  onLoadShopTypes() {

  }

  onCounterpartyEdited(e) {
    console.dir(e);
    let idx = this.tabData.findIndex((i) => i.id === e.id);
    this.counterpartiesService.editCounterparty(e, e.id).subscribe(
      (data) => {
        this.tabData[idx] = {...data}
      }
    )

  }

  onCounterpartyNew(e) {
    console.dir(e);
    let idx = this.tabData.findIndex((i) => i.id === e.id);
    this.counterpartiesService.newCounterparty(e).subscribe( data => {
      this.tabData = [...this.tabData, data]
    })

  }

  onManufactureEdited(e) {

  }

  onManufactureNew(e) {

  }

  loadCounterpartiesForLists() {
    this.counterpartiesService.fetchCounterPartiesData().subscribe((data: ReferenceResponseModel) => {
      this.counterpartiesData = [...data.content];

    });
  }

  loadShopTypesForList(){
    this.shopTypesService.fetchShopTypesData().subscribe((data: ReferenceResponseModel) => {
      this.shopTypes = [...this.shopTypesDataTransformHelper(data)];
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

}

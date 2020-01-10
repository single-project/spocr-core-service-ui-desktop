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
import {FilterService} from "../../core/services/filter.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private searchString: string;
  private tableTitle: string;
  private tabData: any;
  private manufatureData = [];
  private counterpartiesData = [];
  private dataType: number;
  private userId: number;
  private loading: boolean;
  private activeChecked: boolean;
  private nonActiveChecked: boolean;
  private shopTypes = [];


  constructor(
    @Inject(ShopsService) private shopService: ShopsService,
    @Inject(SearchService) private search: SearchService,
    @Inject(CounterpartiesService) private counterpartiesService: CounterpartiesService,
    @Inject(ShopTypesService) private shopTypesService: ShopTypesService,
    @Inject(ManufactureService) private manufactureService: ManufactureService,
    @Inject(MessageService) private mService: MessageService,
    @Inject(FilterService) private filterService: FilterService,
  ) {
  }

  ngOnInit() {

    this.userId = 1;
    this.loadShopsData();
    this.activeChecked = false;
    this.nonActiveChecked = false;


  }

  clearSearch(): void {
    this.searchString = '';
    if (this.dataType === 1) {
      this.loadShopsData();
    } else if (this.dataType === 2) {
      this.loadCounterpartiesData();
    } else if (this.dataType === 3) {
      this.loadManufactureData();
    } else if (this.dataType === 4) {
      this.loadShopTypesData();
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
    } else if (this.dataType === 3) {
      this.search.manufactureSearch(this.searchString).subscribe((data: ReferenceResponseModel) => {
        this.tabData = data.content;
      })
    } else if (this.dataType === 4) {
      this.search.shopTypeSearch(this.searchString).subscribe((data: ReferenceResponseModel) => {
        this.tabData = this.shopTypesDataTransformHelper(data);
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

  loadManufactureData(): void {
    this.tableTitle = 'Производители';
    this.dataType = 3;
    this.loading = true;
    this.manufactureService.fetchManufacturesData().subscribe((data: ReferenceResponseModel) => {
      this.tabData = [...data.content];
      this.loading = false;
    });
  }

  loadShopTypesData(): void {
    this.tableTitle = 'Типы ТТ';
    this.dataType = 4;
    this.loading = true;
    this.shopTypesService.fetchShopTypesData().subscribe((data: ReferenceResponseModel) => {
      this.tabData = [...this.shopTypesDataTransformHelper(data)];
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

  manufactireToggle() {
    this.loadManufactureData();
  }

  shopTypesToggle() {
    this.loadShopTypesData();
  }

  activeCheck(e) {
    this.activeChecked = e;
    this.filterService.activeFilter(this.dataType, !this.activeChecked).subscribe(
      (data: ReferenceResponseModel) => {
        if (this.dataType === 1) {
          this.tabData = [...this.shopDataTransformHelper(data)];

        }
        if (this.dataType === 4) {
          this.tabData = [...this.shopTypesDataTransformHelper(data)];


        }
        if (this.dataType === 2 || this.dataType === 3) {
          this.tabData = [...data.content];

        }

      }
    );

  }

  nonActiveCheck(e) {
    this.nonActiveChecked = e;
    this.filterService.activeFilter(this.dataType, !this.activeChecked).subscribe(
      (data: ReferenceResponseModel) => {
        if (this.dataType === 1) {
          this.tabData = [...this.shopDataTransformHelper(data)];
        }
        if (this.dataType === 4) {
          this.tabData = [...this.shopTypesDataTransformHelper(data)];

        }
        if (this.dataType === 2 || this.dataType === 3) {
          this.tabData = [...data.content];
        }

      }
    );

  }

  onShopEdited(e) {
    console.dir(e.types);
    // if (e.types) {
    //   this.shopService.shopTypeAdd(e.types[0], e.shopData.id).subscribe();
    // }
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
      this.tabData = [...this.tabData, this.shopSingleTransformHelper(data)];
      this.showSuccessSavingMessage()
    }, error => {
      this.showServerErrorToast();
    });

  }

  onShopTypeNew(e) {
    let idx = this.tabData.findIndex((i) => i.id === e.id);

    this.shopTypesService.newShopType(e).subscribe((data) => {
      this.tabData = [...this.tabData, this.shopTypesSingleTransformHelper(data)];
      this.showSuccessSavingMessage()
    }, error => {
      this.showServerErrorToast();
    });
  }

  onShopTypesEdit(e) {
    console.dir
    let idx = this.tabData.findIndex((i) => i.id === e.id);

    this.shopTypesService.editShopType(e, e.id).subscribe((data) => {
      this.tabData[idx] = {...this.shopTypesSingleTransformHelper(data)};
      this.showSuccessSavingMessage()
    }, error => {
      this.showServerErrorToast();
    })
  }

  onLoadShopTypes() {

  }

  onCounterpartyEdited(e) {
    console.dir(e);
    let idx = this.tabData.findIndex((i) => i.id === e.id);
    this.counterpartiesService.editCounterparty(e, e.id).subscribe(
      (data) => {
        this.tabData[idx] = {...data};
        this.showSuccessSavingMessage();
      },
      error => {
        this.showServerErrorToast();
      }
    )

  }

  onCounterpartyNew(e) {
    console.dir(e);
    let idx = this.tabData.findIndex((i) => i.id === e.id);
    this.counterpartiesService.newCounterparty(e).subscribe(data => {
      this.tabData = [...this.tabData, data];
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })

  }

  onManufactureEdited(e) {
    let idx = this.tabData.findIndex((i) => i.id === e.id);
    this.manufactureService.editManufacture(e, e.id).subscribe(data => {
      this.tabData[idx] = {...data};
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })

  }

  onManufactureNew(e) {
    let idx = this.tabData.findIndex((i) => i.id === e.id);
    this.manufactureService.newManufacture(e).subscribe(data => {
      this.tabData = [...this.tabData, data];
      this.showSuccessSavingMessage();
    }, error => {
      this.showServerErrorToast();
    })
  }

  loadCounterpartiesForLists() {
    this.counterpartiesService.fetchCounterPartiesData().subscribe((data: ReferenceResponseModel) => {
      this.counterpartiesData = [...data.content];

    });
  }

  loadShopTypesForList() {
    this.shopTypesService.fetchShopTypesData().subscribe((data: ReferenceResponseModel) => {
      this.shopTypes = [...this.shopTypesDataTransformHelper(data)];
    });
  }

  loadManufatureDataForList() {
    this.manufactureService.fetchManufacturesData().subscribe((data: ReferenceResponseModel) => {
      this.manufatureData = [...data.content];
    })

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

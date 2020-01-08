import {Component, Inject, OnInit} from '@angular/core';
import {ShopsService} from "../../core/services/shops.service";
import {ShopModel} from "../../core/models/shop.model";
import {SearchService} from "../../core/services/search.service";
import {ReferenceResponseModel} from "../../core/models/reference-response.model";
import {CounterpartiesService} from "../../core/services/counterparties.service";
import {CounterpartyModel} from "../../core/models/counterparty.model";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private searchString: string;
  private tableTitle: string;
  private tabData: ShopModel[] | CounterpartyModel[];
  private dataType: number;
  private userId: number;
  private loading: boolean;
  private activeChecked: boolean;
  private nonActiveChecked: boolean;
  private clonedTabData;



  constructor(
    @Inject(ShopsService) private shopService: ShopsService,
    @Inject(SearchService) private search: SearchService,
    @Inject(CounterpartiesService) private counterpartiesService: CounterpartiesService,
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
        this.tabData = data.content;
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

      this.tabData = [...this.shopTableDataPreloader(data)];
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

  shopTableDataPreloader(rawData: any): ShopModel[] {
    const newData: ShopModel[] = [];
    rawData.content.forEach((d) => {
      d.counterpartyName = d.counterparty.name;
      d.counterpartyId = d.counterparty.id;
      newData.push(d)
    });
    return newData;

  }

  shopsToggle() {

    this.loadShopsData();
  }

  counterpartiesToggle() {

    this.loadCounterpartiesData();
    console.log(this.dataType);
  }

  activeCheck(e) {
    this.activeChecked = e;
    if(e){
      this.clonedTabData = [...this.tabData];
      [...this.tabData] = this.tabData.filter((d) => {
        if(!d.active){
          return d;
        }
      })

    }
    if(!e){
      [...this.tabData] = this.clonedTabData;
      this.clonedTabData = [];
    }
  }

  nonActiveCheck(e) {
    this.nonActiveChecked = e;
    if(e){
      this.clonedTabData = [...this.tabData];
      [...this.tabData] = this.tabData.filter((d) => {
        if(d.active){
          return d;
        }
      })

    }
    if(!e){
      [...this.tabData] = this.clonedTabData;
      this.clonedTabData = [];
    }

  }

}

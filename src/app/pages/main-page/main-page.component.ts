import {Component, Inject, OnInit} from '@angular/core';
import {ShopsService} from "../../core/services/shops.service";
import {ShopModel} from "../../core/models/shop.model";
import {SearchService} from "../../core/services/search.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private searchString: string;
  private tableTitle: string;
  private tabData: ShopModel[];
  private dataType: number;


  constructor(@Inject(ShopsService) private shopService: ShopsService, @Inject(SearchService) private search: SearchService) {
  }

  ngOnInit() {
    this.tableTitle = 'Торговые точки';
    this.dataType = 1;
    this.shopService.fetchShopData().subscribe(data => {

      this.tabData = data['content'];


    });


  }

  clearSearch(): void {
    this.searchString = '';
    if (this.dataType === 1) {
      this.shopService.fetchShopData().subscribe(data => {

        this.tabData = data['content'];

      });
    }
  }

  onSearched() {
    if (this.dataType === 1) {
      this.search.shopSearch(this.searchString).subscribe(res => {
        this.tabData = res['content'];
      })
    }
  }
}

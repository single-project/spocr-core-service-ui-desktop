import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  searchString: string;

  tableTitle: string;

  constructor() { }

  ngOnInit() {
    this.tableTitle = 'Торговые точки'
  }

  clearSearch(): void{
    this.searchString = '';
  }
}

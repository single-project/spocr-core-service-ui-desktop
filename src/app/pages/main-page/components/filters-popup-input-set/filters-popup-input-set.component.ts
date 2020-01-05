import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters-popup-input-set',
  templateUrl: './filters-popup-input-set.component.html',
  styleUrls: ['./filters-popup-input-set.component.scss']
})
export class FiltersPopupInputSetComponent implements OnInit {
  checkedNonActive: boolean = false;
  checkedActive: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}

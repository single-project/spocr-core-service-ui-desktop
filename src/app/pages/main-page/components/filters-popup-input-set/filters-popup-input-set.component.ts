import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters-popup-input-set',
  templateUrl: './filters-popup-input-set.component.html',
  styleUrls: ['./filters-popup-input-set.component.scss']
})
export class FiltersPopupInputSetComponent implements OnInit {
  @Input()
  checkedNonActive: boolean;
  @Input()
  checkedActive: boolean;
  @Output()
  checkActive = new EventEmitter<boolean>();
  @Output()
  checkedNonActiveEm = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {

  }

  activeCheck(): void {
    this.checkedNonActiveEm.emit(!this.checkedActive);
  }

  nonActiveCheck(): void {
    this.checkedNonActiveEm.emit(!this.checkedNonActive);
  }
}

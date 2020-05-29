import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters-popup-input-set',
  templateUrl: './filters-popup-input-set.component.html',
  styleUrls: ['./filters-popup-input-set.component.scss']
})
export class FiltersPopupInputSetComponent implements OnInit {
  @Input() checkedNonActive: boolean;
  @Input() checkedActive: boolean;
  @Output() onCheckActive = new EventEmitter<boolean>();
  @Output() onCheckedNonActive = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {

  }

  activeCheck(): void {
    this.onCheckActive.emit(!this.checkedActive);

  }

  nonActiveCheck(): void {
    this.onCheckedNonActive.emit(!this.checkedNonActive);
  }

}

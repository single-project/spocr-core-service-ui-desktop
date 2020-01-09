import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent implements OnInit, OnChanges {
  @Input() entity;
  @Input() display;
  @Input() counterpartiesList;
  @Input() shopTypesList;
  @Output() onShopSave = new EventEmitter<any>();
  @Output() onCounterpartySelection = new EventEmitter<any>();
  @Output() onShopTypeSelection = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newShop = {};
  private newShopName: string;
  private newShopCounterparty = {};
  private newShopType = {};
  private newShopActivity: boolean;
  private counterpartiesForSelect;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.counterpartiesForSelect = this.prepareCparties(this.counterpartiesList);
  }

  shopSaved() {
    this.newShop = {...this.newShop, name: this.entity.name, id: this.entity.id, active: this.entity.active, counterparty: {id: this.entity.counterpartyId}, version: this.entity.version};
    this.onShopSave.emit(this.newShop);
  }

  shopCounterpartySelect() {
    console.log('1st fired');
    this.onCounterpartySelection.emit();
  }

  shopTypeSelect() {
    this.onShopTypeSelection.emit();
  }

  closeDialog(){
    this.onCloseDialog.emit(false);
  }

  prepareCparties(cpartyList: []) {

    const cArr = [];
    cpartyList.forEach(c => {
      let cParty = {};
      cParty = {...cParty, label: c.name, value: {id: c.id, name: c.name}};
      // cParty['value']['id'] = c.id;
      // cParty['value']['name'] = c.name;
      cArr.push(cParty);
    });

    console.log(cArr);
    return cArr;
  }

}

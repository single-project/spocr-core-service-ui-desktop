import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";

@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent implements OnInit, OnChanges {
  @Input() shop;
  @Input() display;
  @Input() counterpartiesList;
  @Input() shopTypesList;
  @Input() isNew;
  @Output() onEditedShopSave = new EventEmitter<any>();
  @Output() onNewShopSaved = new EventEmitter<any>();
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
    console.log(this.isNew)


  }

  shopSaved() {

    if (this.isNew) {
      this.newShop = {
        ...this.newShop,
        name: this.shop.name,
        active: this.shop.active,
        counterparty: {id: this.shop.counterpartyId}
      };
      this.onNewShopSaved.emit(this.newShop);
    } else {
      this.newShop = {
        ...this.newShop,
        name: this.shop.name,
        id: this.shop.id,
        active: this.shop.active,
        counterparty: {id: this.shop.counterpartyId},
        version: this.shop.version
      };
      this.onEditedShopSave.emit(this.newShop);
    }

    this.onCloseDialog.emit(false);
  }

  shopCounterpartySelect() {
    console.log('1st fired');
    this.onCounterpartySelection.emit();
  }

  shopTypeSelect() {
    this.onShopTypeSelection.emit();
  }

  closeDialog() {
    this.shop = null;
    this.onCloseDialog.emit(false);
  }

  prepareCparties(cpartyList: []) {

    const cArr = [];
    cpartyList.forEach((c: CounterpartyModel) => {
      let cParty = {};
      cParty = {...cParty, label: c.name, value: c.id};
      cArr.push(cParty);
    });

    console.log(cArr);
    return cArr;
  }

}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {IdNameModel} from "../../../../core/models/id-name.model";

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
  @Output() onShopTypeSaved = new EventEmitter<any>();
  @Output() onCounterpartySelection = new EventEmitter<any>();
  @Output() onShopTypeSelection = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newShop = {};
  private counterpartiesForSelect;
  private shopTypesForLabel: IdNameModel[];
  private selectedShopTypes: IdNameModel[] = [];


  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {


  }

  shopSaved() {

    if (this.isNew) {

      this.newShop = {
        ...this.newShop,
        shopData: {
          name: this.shop.name,
          active: this.shop.active,
          counterparty: {id: this.shop.counterpartyId},
          shopTypes: [...this.selectedShopTypes.map(t => {
            if (t !== {}) {
              return {id: t.id}
            }
          })]
        },
      };
      this.onNewShopSaved.emit(this.newShop);
    } else {
      this.newShop = {
        ...this.newShop,
        shopData: {
          name: this.shop.name,
          id: this.shop.id,
          active: this.shop.active,
          counterparty: {id: this.shop.counterpartyId},
          version: this.shop.version
        }
      };
      this.onEditedShopSave.emit(this.newShop);
    }

    this.onCloseDialog.emit(false);
  }

  shopSavedShopType() {
    this.onShopTypeSaved.emit([
      ...this.selectedShopTypes.map(t => {
        return {id: t.id}
      })
    ])
  }

  closeDialog() {
    this.onCloseDialog.emit(false);
  }

  counterpartiesTranformHelper(cpartyList: []) {

    const cArr = [];
    cpartyList.forEach((c: CounterpartyModel) => {
      let cParty = {};
      cParty = {...cParty, label: c.name, value: c.id};
      cArr.push(cParty);
    });

    return cArr;
  }

  /*shopTypesTranformHelper(shopTypesList: []) {

    const stArr = [];
    if (shopTypesList) {
      shopTypesList.forEach((st) => {
        let shopType = {label: st['name'], value: st['id']};
        stArr.push(shopType);
      });
    }
    return stArr;
  }
*/

  typesChange(){
    console.dir(this.selectedShopTypes);
  }

  afterShow() {
    this.counterpartiesForSelect = this.counterpartiesTranformHelper(this.counterpartiesList);
    this.selectedShopTypes = this.shop.shopTypes;
    this.shopTypesForLabel = this.shopTypesList;

    console.dir(this.selectedShopTypes);
    console.dir(this.shopTypesForLabel);
  }

}

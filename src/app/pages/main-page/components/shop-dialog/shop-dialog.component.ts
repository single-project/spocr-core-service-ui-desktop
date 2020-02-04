import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {IdNameModel} from "../../../../core/models/id-name.model";
import {DadataAddress, DadataConfig} from "@kolkov/ngx-dadata";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MenuItem} from "primeng";

enum ShopTabs {
  General,
  Address
}

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
  @Input() dadataAddressConfig: DadataConfig;
  @Output() onEditedShopSave = new EventEmitter<any>();
  @Output() onNewShopSaved = new EventEmitter<any>();
  @Output() onShopTypeSaved = new EventEmitter<any>();
  @Output() onCounterpartySelection = new EventEmitter<any>();
  @Output() onShopTypeSelection = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newShop = {};
  private shopFrom: FormGroup;
  private tabs: MenuItem[];
  private shopTabs = ShopTabs;
  private currentTab: ShopTabs;


  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.shopFrom = this.fb.group({
      'shopType': [{}, Validators.required],
      'counterparty': [0, Validators.required],
      'shopName': ['', Validators.required],
      'shopActive': [true],
      'shopAddress': ['']
    });
  }

  ngOnInit() {
    this.currentTab = ShopTabs.General;
    this.tabs = [
      {label: 'Основное', icon: 'fas fa-file-alt', command: (e) => {this.toggleTabs(ShopTabs.General)}},
      {label: 'Адрес', icon: 'fas fa-map-marker-alt', command: (e) => {this.toggleTabs(ShopTabs.Address)}},
    ]
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  shopSaved() {

    if (this.isNew) {

      this.newShop = {
        ...this.newShop,
        shopData: {
          name: this.shopFrom.get('shopName').value,
          active: this.shopFrom.get('shopActive').value,
          counterparty: {id: this.shopFrom.get('counterparty').value['id']},
          shopTypes: [{id: this.shopFrom.get('shopType').value['id']}]
        },
      };
      this.onNewShopSaved.emit(this.newShop);
    } else {
      this.newShop = {
        ...this.newShop,
        shopData: {
          name: this.shopFrom.get('shopName').value,
          id: this.shop.id,
          active: this.shopFrom.get('shopActive').value,
          counterparty: {id: this.shopFrom.get('counterparty').value['id']},
          version: this.shop.version,
          shopTypes: [{id: this.shopFrom.get('shopType').value['id']}]
        }

      };
      this.onEditedShopSave.emit(this.newShop);
    }

    this.onCloseDialog.emit(false);
  }


  closeDialog() {
    this.onCloseDialog.emit(false);
  }


  initAfterViewFormValues(fields: { [key: string]: any }[]): void {
    fields.forEach(field => {
      this.shopFrom.patchValue({...field});
    })
  }

  newResetForm(): void {
    this.initAfterViewFormValues([
      {'shopType': null},
      {'counterparty': null},
      {'shopName': null},
      {'shopActive': true}
    ]);
  }

  toggleTabs(triggerEvent: ShopTabs): void {
    switch (triggerEvent) {
      case ShopTabs.Address:
        this.currentTab = this.shopTabs.Address;
        break;
      case ShopTabs.General:
        this.currentTab = this.shopTabs.General;
        break;
    }
  }

  typesChange() {

  }

  afterShow() {
    if (!this.isNew) {
      this.initAfterViewFormValues([
        {'shopType': this.shop.shopTypes[0]},
        {'counterparty': this.shop.counterparty},
        {'shopName': this.shop.name},
        {'shopActive': this.shop.active}
      ]);
    } else {
      this.newResetForm();
    }


  }

}

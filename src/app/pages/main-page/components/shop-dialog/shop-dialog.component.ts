import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CounterpartyModel} from "../../../../core/models/counterparty.model";
import {IdNameModel} from "../../../../core/models/id-name.model";
import {DadataAddress, DadataConfig} from "@kolkov/ngx-dadata";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MenuItem} from "primeng";
import {AddressSuggestion} from "../../../../core/models/suggestion-address.model";
import {ShopAddress, ShopCounterparty, ShopModel, ShopType} from "../../../../core/models/shop.model";
import * as _ from 'lodash';
import {distinctUntilChanged, tap} from "rxjs/operators";


@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent implements OnInit, OnChanges {
  @Input() shop: ShopModel;
  @Input() display: boolean;
  @Input() counterpartiesList: ShopCounterparty[];
  @Input() shopTypesList: ShopType[];
  @Input() isNew: boolean;
  @Input() dadataAddressConfig: DadataConfig;
  @Output() onEditedShopSave = new EventEmitter<any>();
  @Output() onNewShopSaved = new EventEmitter<any>();
  @Output() onShopTypeSaved = new EventEmitter<any>();
  @Output() onCounterpartySelection = new EventEmitter<any>();
  @Output() onShopTypeSelection = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  private newShop = {};
  private shopFrom: FormGroup;
  private addressSuggestion: AddressSuggestion;
  private shopClone: ShopModel;
  private saveShop: ShopModel;
  private changedFields: any;


  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.shopFrom = this.buildShopForm();
  }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  shopSaved() {
    // console.dir(this.shopClone);
    this.shopFrom.valueChanges.subscribe(
      s => this.saveShop = s
    );
    this.getUpdatedFields(this.shopFrom);

    // if (this.isNew) {
    //
    //   this.newShop = {
    //     ...this.newShop,
    //     shopData: {
    //       name: this.shopFrom.get('shopName').value,
    //       active: this.shopFrom.get('shopActive').value,
    //       counterparty: {id: this.shopFrom.get('counterparty').value['id']},
    //       shopTypes: [{id: this.shopFrom.get('shopType').value['id']}],
    //       address: {
    //         active: true,
    //         address: this.addressSuggestion.value,
    //         comment: this.shopFrom.get('shopComment').value,
    //         suggestion: this.addressSuggestion
    //       }
    //     },
    //   };
    //   this.onNewShopSaved.emit(this.newShop);
    // } else {
    //   this.newShop = {
    //     ...this.newShop,
    //     shopData: {
    //       name: this.shopFrom.get('shopName').value,
    //       id: this.shop.id,
    //       active: this.shopFrom.get('shopActive').value,
    //       counterparty: {id: this.shopFrom.get('counterparty').value['id']},
    //       version: this.shop.version,
    //       shopTypes: [{id: this.shopFrom.get('shopType').value['id']}],
    //       address: {
    //         id: this.shop.address.id,
    //         active: this.shop.address.active,
    //         address: this.addressSuggestion.value,
    //         version: this.shop.address.version,
    //         comment: this.shopFrom.get('shopComment').value,
    //         suggestion: this.addressSuggestion
    //       }
    //     }
    //
    //   };
    // //   this.onEditedShopSave.emit(this.newShop);
    // }
    //
    // this.onCloseDialog.emit(false);
  }


  closeDialog() {

    this.onCloseDialog.emit(false);

  }

  getUpdatedFields(form: any) {
    let dirtyValues = {};
    Object.keys(form.controls).forEach(k => {
      let currentControl = form.controls[k];
      if (currentControl.dirty) {
        if (currentControl.controls)
          dirtyValues[k] = this.getUpdatedFields(currentControl);
        else
          dirtyValues[k] = currentControl.value;
      }
    });
    console.dir(dirtyValues);
  }

  initAfterShowFormValues(fields: { [key: string]: any }[]): void {
    fields.forEach(field => {
      this.shopFrom.patchValue({...field});
    })
  }


  onAddressSuggest(e): void {
    if (e) {
      this.addressSuggestion = e;
    } else {
      this.addressSuggestion = <AddressSuggestion>{}
    }

  }

  buildShopForm(): FormGroup {
    return this.fb.group({
      id: null,
      name: ['', Validators.required],
      shopTypes: [<ShopType[]>[], Validators.required],
      counterparty: [<ShopCounterparty>{}, Validators.required],
      active: true,
      address: this.fb.group({
        id: null,
        version: null,
        active: true,
        address: '',
        comment: ''
      }),
      version: null,
      updatedFields: null,
    });
  }

  afterShow() {
    if (!this.isNew) {
      this.initAfterShowFormValues([
        {id: this.shop.id},
        {name: this.shop.name},
        {shopTypes: this.shop.shopTypes[0]},
        {counterparty: this.shop.counterparty},
        {
          address: {
            id: this.shop.address.id,
            version: this.shop.address.version,
            active: this.shop.address.active,
            address: this.shop.address.address,
            comment: this.shop.address.comment
          },
          version: this.shop.version,
          updatedFields: null
        },
      ]);
      this.shopClone = this.shopFrom.value;
    } else {
      this.shopFrom.reset();
    }


  }

}

import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressSuggestion} from "../../../../core/models/suggestion-address.model";
import {ShopCounterparty, ShopModel, ShopType} from "../../../../core/models/shop.model";
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {SaleschannelsService} from '../../../../core/services/saleschannels.service';
import {ShopdepartsService} from '../../../../core/services/shopdeparts.service';
import {ShopspecializationsService} from '../../../../core/services/shopspecializations.service';


@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent implements OnInit, OnChanges {
  @Input() shop: ShopModel;
  @Input() display: boolean;
  @Output() onEditedShopSave = new EventEmitter<any>();
  @Output() onNewShopSaved = new EventEmitter<any>();
  @Output() onShopTypeSaved = new EventEmitter<any>();
  @Output() onCloseDialog = new EventEmitter<boolean>();
  public counterpartiesList: ShopCounterparty[] = [];
  public shopTypesList: ShopType[] = [];
  private shopFrom: FormGroup;
  private isNew =  false;


  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(CounterpartiesService) private counterpartiesSevice: CounterpartiesService,
    @Inject(ShopTypesService) private shopTypeService: ShopTypesService,
    @Inject(SaleschannelsService) private salesChanelService: SaleschannelsService,
    @Inject(ShopdepartsService) private shopdepartsService: ShopdepartsService,
    @Inject(ShopspecializationsService) private shopSpecializationsService: ShopspecializationsService

  ) {
    this.shopFrom = this.buildShopForm();

  }

  ngOnInit() {
  this.loadCounterpartiesList();
  this.loadShopTypesList();

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  shopSaved() {

    this.shopFrom.patchValue({updatedFields: this.getUpdatedFields(this.shopFrom)});


    if (!this.isNew) {

      if (this.shopFrom.dirty) {
        this.onEditedShopSave.emit(this.shopFrom.value);
      } else this.closeDialog();


    } else {

      this.shopFrom.removeControl('updatedFields');

      this.onNewShopSaved.emit(this.shopFrom.value);
    }
    this.closeDialog();
  }


  closeDialog() {
    this.shopFrom.reset();
    this.onCloseDialog.emit(false);

  }

  getUpdatedFields(form: any) {
    let dirtyValues = {};
    Object.keys(form.controls).forEach(k => {
      let currentControl = form.controls[k];
      if (currentControl.dirty) {
        dirtyValues[k] = currentControl.value;

      }
    });
    return Object.keys(dirtyValues);
  }

  initAfterShowFormValues(fields: { [key: string]: any }[]): void {
    fields.forEach(field => {
      this.shopFrom.patchValue({...field});
    })
  }


  buildShopForm(): FormGroup {
    return this.fb.group({
      id: null,
      name: ['', Validators.required],
      shopTypes: [[<ShopType>{}], Validators.required],
      counterparty: [<ShopCounterparty>{}, Validators.required],
      active: true,
      address: this.fb.group({
        id: null,
        version: null,
        active: true,
        address: '',
        comment: '',
        latitude: '',
        longitude: '',
        suggestion: <AddressSuggestion>{},
      }),
      version: null,
      updatedFields: null,
    });
  }
  loadCounterpartiesList(): void{
     this.counterpartiesSevice.fetchCounterPartiesData(party => {
      this.counterpartiesList = party;
    });
  }
  loadShopTypesList(): void{
    this.shopTypeService.fetchShopTypesData(type => {
      this.shopTypesList = type;
    })
  }
  afterShow() {
    if(Object.keys(this.shop).length <= 1){
      this.isNew = true;
    }else {
      this.isNew = false;
    }

    if (!this.isNew) {
      this.initAfterShowFormValues([
        {id: this.shop.id},
        {name: this.shop.name},
        {shopTypes: this.shop.shopTypes},
        {counterparty: this.shop.counterparty},
        {active: this.shop.active},
        {
          address: {
            id: this.shop.address.id,
            version: this.shop.address.version,
            active: this.shop.address.active,
            address: this.shop.address.address,
            comment: this.shop.address.comment,
            suggestion: this.shop.address.suggestion,
            latitude: this.shop.address.latitude,
            longitude: this.shop.address.longitude
          },
          version: this.shop.version,
          updatedFields: null
        },
      ]);

    } else {
      this.shopFrom.reset();
    }


  }

}

import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressSuggestion} from "../../../../core/models/suggestion-address.model";
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {SaleschannelsService} from '../../../../core/services/saleschannels.service';
import {ShopdepartsService} from '../../../../core/services/shopdeparts.service';
import {ShopspecializationsService} from '../../../../core/services/shopspecializations.service';
import {map, tap} from 'rxjs/operators';
import {ShopsService} from '../../../../core/services/shops.service';
import {
  CounterpartyModel,
  SalesChannelModel,
  ShopModel, ShopSpecializationModel,
  ShopTypeModel
} from '../../../../core/models/global-reference.model';


@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent implements OnInit, OnChanges {
  @Input() public shop: ShopModel;
  @Output() public onShopSaved = new EventEmitter<ShopModel>();
  public counterpartiesList: any[] = [];
  public shopTypesList: ShopTypeModel[] = [];
  public salesChannelsList: { name: string, id: number }[] = [];
  public shopSpecializationList: {name: string, id: number}[] =[];
  public shopDepartsList: {name: string, id: number}[] =[];
  public _display = false;
  public shopFrom: FormGroup;
  public isNew = false;


  constructor(
     private fb: FormBuilder,
     private counterpartiesSevice: CounterpartiesService,
     private shopTypeService: ShopTypesService,
     private salesChanelService: SaleschannelsService,
     private shopdepartsService: ShopdepartsService,
     private shopSpecializationsService: ShopspecializationsService,
     private shopService: ShopsService
  ) {
    this.shopFrom = this.buildShopForm();


  }

  ngOnInit() {
    this.loadCounterpartiesList();
    this.loadShopTypesList();
    this.loadSalesChannels();


  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  shopSaved() {

    this.shopFrom.patchValue({updatedFields: this.getUpdatedFields(this.shopFrom)});


    if (!this.isNew) {

      if (this.shopFrom.dirty) {
        this.shopService.editItem(this.shopFrom.value, this.shop.id).pipe(
          tap(s => this.onShopSaved.emit(s))
        ).subscribe();
      } else this.closeDialog();


    } else {

      this.shopFrom.removeControl('updatedFields');
      this.shopService.newItem(this.shopFrom.value).pipe(
        tap((s: ShopModel) => this.onShopSaved.emit(s))
      ).subscribe();
    }
    this.closeDialog();
  }


  closeDialog() {
    this._display = false;
    this.shopFrom.reset();


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
      shopTypes: [[<ShopTypeModel>{}], Validators.required],
      counterparty: [<CounterpartyModel>{}, Validators.required],
      salesChannels: [[]],
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

  loadCounterpartiesList(): void {
    this.counterpartiesSevice.fetchData().pipe(
      map(p => p.content),
    ).subscribe(party => {
      this.counterpartiesList = party
    });
  }

  loadShopTypesList(): void {
    this.shopTypeService.get().pipe(
      map(tp => tp.content),
      map(tp => tp.map(t => {
        return {id: t.id, name: `${t.name} / ${t.manufacturer.name}`}
      }))
    ).subscribe(type => {
      this.shopTypesList = type;
      console.dir(type);
    });
  }

  loadSalesChannels(): void {
    this.salesChanelService.fetchData()
      .pipe(
      map(sc => sc.content),
      map((sc: SalesChannelModel[]) => sc.map(s => {
        return {id: s.id, name: `${s.name} / ${s.manufacturer.name}`}
      }))
    ).subscribe(channels => this.salesChannelsList = channels)
  }

  loadShopSpecialization(): void{
    this.shopSpecializationsService.fetchData()
      .pipe(
        map(ss => ss.content),
        map((ss: ShopSpecializationModel[]) => ss.map(s => {
          return {id: s.id, name: `${s.name} / ${s.manufacturer.name}`}
        }))
      ).subscribe(channels => this.salesChannelsList = channels)
  }

  afterShow() {

    if (Object.keys(this.shop).length <= 1) {
      this.isNew = true;
    } else {
      this.isNew = false;
    }

    if (!this.isNew) {
      this.initAfterShowFormValues([
        {id: this.shop.id},
        {name: this.shop.name},
        {shopTypes: this.shop.shopTypes},
        {counterparty: this.shop.counterparty},
        {salesChannels: this.shop.salesChannels},
        {active: this.shop.active},
        {
          address: this.shop.address,
          version: this.shop.version,
          updatedFields: null
        },
      ]);


    } else {
      this.shopFrom.reset();
    }


  }

  optionLabelMaker(e) {
    console.dir(e)
  }
}

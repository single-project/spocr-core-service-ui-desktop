import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressSuggestion} from "../../../../core/models/suggestion-address.model";
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {SalesChannelService} from '../../../../core/services/sales-channel.service';
import {ShopDepartsService} from '../../../../core/services/shop-departs.service';
import {ShopSpecializationsService} from '../../../../core/services/shop-specializations.service';
import {map} from 'rxjs/operators';
import {ShopsService} from '../../../../core/services/shops.service';
import {
  AddressModel,
  SalesChannelModel, ShopDepartModel,
  ShopModel,
  ShopSpecializationModel,
  ShopTypeModel
} from '../../../../core/models/global-reference.model';
import {EntityCardModel} from "../../../../core/models/entity-card.model";
import {ConfigService} from "../../../../core/services/config.service";
import {PersonalRekvService} from "../../../../core/services/personal-rekv.service";
import {ManufactureService} from "../../../../core/services/manufacture.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {MessageServiceFacadeService} from "../../../../core/services/message-service-facade.service";


@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent extends EntityCardModel<ShopModel> implements OnInit, OnChanges {
  public counterpartiesList: any[] = [];
  public shopTypesList: ShopTypeModel[] = [];
  public salesChannelsList: { name: string, id: number }[] = [];
  public shopSpecializationList: { name: string, id: number }[] = [];
  public shopDepartsList: { name: string, id: number }[] = [];

  constructor(private configService: ConfigService,
              private personalService: PersonalRekvService,
              private manufacturerService: ManufactureService,
              public dialogRef: DynamicDialogRef,
              public dialogConfig: DynamicDialogConfig,
              public formBuilder: FormBuilder,
              private counterpartyService: CounterpartiesService,
              private shopTypeService: ShopTypesService,
              private salesChanelService: SalesChannelService,
              private shopdepartsService: ShopDepartsService,
              private shopSpecializationsService: ShopSpecializationsService,
              private shopService: ShopsService,
              private messageService: MessageServiceFacadeService,
              private renderer: Renderer2) {
    super(formBuilder, dialogRef, dialogConfig, shopService, messageService);

  }

  ngOnInit() {
    console.dir(this.entity);
    this.loadCounterpartiesList();
    this.loadShopTypesList();
    this.loadSalesChannels();
    this.loadShopSpecialization();
    this.loadShopDeparts();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  buildFormGroup() {
    let e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: e.id,
      name: [e.name, Validators.required],
      shopTypes: [e.shopTypes, Validators.required],
      counterparty: [e.counterparty, Validators.required],
      salesChannels: [e.salesChannels, Validators.required],
      shopDeparts: e['shopDeparts'],
      shopSpecializations: e['shopSpecializations'],
      active: e.active,
      version: e.version,
      updatedFields: null
    });

    this.addAddress();
  }

  addAddress() {
    let e = this.entity;
    console.log(this.entity);
    //TODO: может вообще никакой entity как свойства не требуется? И опираться в шаблоне на некий набор свойств
    if (!this.entity.address) {
      this.entity.address = {active: true} as AddressModel;
    }

    if (e.address) {
      this.addNestedObjectIfNotContains("address", {
        id: e.address.id,
        version: e.address.version,
        active: e.address.active,
        address: e.address.address,
        comment: e.address.comment,
        latitude: e.address.latitude,
        longitude: e.address.longitude,
        suggestion: <AddressSuggestion>{},
      });
    }
  }

  removeAddress() {
    this.removeNestedObjectIfContains("address");
  }

  loadCounterpartiesList(): void {
    this.counterpartyService.get().pipe(
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
    });
  }

  loadSalesChannels(): void {
    this.salesChanelService.get()
    .pipe(
      map(sc => sc.content),
      map((sc: SalesChannelModel[]) => sc.map(s => {
        return {id: s.id, name: `${s.name} / ${s.manufacturer.name}`}
      }))
    ).subscribe(channels => this.salesChannelsList = channels)
  }

  loadShopSpecialization(): void {
    this.shopSpecializationsService.get()
    .pipe(
      map(ss => ss.content),
      map((ss: ShopSpecializationModel[]) => ss.map(s => {
        return {id: s.id, name: `${s.name} / ${s.manufacturer.name}`}
      }))
    ).subscribe(spec => this.shopSpecializationList = spec)
  }

  loadShopDeparts(): void {
    this.shopdepartsService.get()
      .pipe(
        map(sd => sd.content),
        map((sd: ShopDepartModel[]) => sd.map(d => {
          return {id: d.id, name: `${d.name} / ${d.manufacturer.name}`}
        }))
      ).subscribe(departs => this.shopDepartsList = departs)
  }



  instantiate(options?): ShopModel {
    return {} as ShopModel;
  }

  populateFormGroup() {
  }

}

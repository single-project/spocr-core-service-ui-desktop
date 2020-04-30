import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AddressSuggestion} from '../../../../core/models/suggestion-address.model';
import {CounterpartiesService} from '../../../../core/services/counterparties.service';
import {ShopTypesService} from '../../../../core/services/shop-types.service';
import {SalesChannelService} from '../../../../core/services/sales-channel.service';
import {ShopDepartsService} from '../../../../core/services/shop-departs.service';
import {ShopSpecializationsService} from '../../../../core/services/shop-specializations.service';
import {map, take} from 'rxjs/operators';
import {ShopsService} from '../../../../core/services/shops.service';
import {
  AddressModel, ManufacturerModel,
  SalesChannelModel, ShopDepartModel,
  ShopModel,
  ShopSpecializationModel,
  ShopTypeModel
} from '../../../../core/models/global-reference.model';
import {EntityCardModel} from '../../../../core/models/entity-card.model';
import {ConfigService} from '../../../../core/services/config.service';
import {PersonalRekvService} from '../../../../core/services/personal-rekv.service';
import {ManufactureService} from '../../../../core/services/manufacture.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng';
import {MessageServiceFacadeService} from '../../../../core/services/message-service-facade.service';
import * as _ from 'lodash';
import moment from 'moment-timezone';

@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent extends EntityCardModel<ShopModel> implements OnInit, OnChanges {
  public counterpartiesList: any[] = [];
  public shopTypesList: ShopTypeModel[] = [];
  public salesChannelsList: SalesChannelModel[] = [];
  public shopSpecializationList: ShopSpecializationModel[] = [];
  public shopDepartsList: ShopDepartModel[] = [];
  public manufacturerList: ManufacturerModel[] = [];

  constructor(
    configService: ConfigService,
    private personalService: PersonalRekvService,
    private manufacturerService: ManufactureService,
    dialogRef: DynamicDialogRef,
    dialogConfig: DynamicDialogConfig,
    formBuilder: FormBuilder,
    private counterpartyService: CounterpartiesService,
    private shopTypeService: ShopTypesService,
    private salesChanelService: SalesChannelService,
    private shopdepartsService: ShopDepartsService,
    private shopSpecializationsService: ShopSpecializationsService,
    shopService: ShopsService,
    messageService: MessageServiceFacadeService,
  ) {
    super(
      formBuilder,
      dialogRef,
      dialogConfig,
      shopService,
      messageService,
      configService);
  }

  ngOnInit() {
    this.loadCounterpartiesList();
    this.loadShopTypesList();
    this.loadSalesChannels();
    this.loadShopSpecialization();
    this.loadShopDeparts();
    this.loadManufacturers();
    console.dir(this.entity);
    this.entityDialogForm.valueChanges.subscribe(
      vc => {
        if (this.getUpdatedFields().find(dv => dv === 'manufacturers')) {
          const chosenManufacturers = this.entityDialogForm.get('manufacturers').value;
          chosenManufacturers.forEach(cm => {
            this.shopDepartsList = [...this.shopDepartsList.filter(sd => sd['mId'] === cm.id)];
          });
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  buildFormGroup() {
    const e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: e.id,
      name: [e.name, Validators.required],
      shopTypes: [e.shopTypes, Validators.required],
      counterparty: [e.counterparty, Validators.required],
      salesChannels: [e.salesChannels, Validators.required],
      shopDeparts: [e.shopDeparts, Validators.required],
      shopSpecializations: [e.shopSpecializations, Validators.required],
      active: e.active,
      version: e.version,
      updatedFields: null,
      manufacturers: [e.manufacturers, Validators.required],
    });

    this.addAddress();
  }

  addAddress() {
    const e = this.entity;
    // TODO: может вообще никакой entity как свойства не требуется? И опираться в шаблоне на некий набор свойств
    if (!this.entity.address) {
      this.entity.address = {active: true} as AddressModel;
    }

    if (e.address) {
      this.addNestedObjectIfNotContains('address', {
        id: e.address.id,
        version: e.address.version,
        active: e.address.active,
        address: e.address.address,
        comment: e.address.comment,
        latitude: e.address.latitude,
        longitude: e.address.longitude,
        suggestion: {} as AddressSuggestion,
      });
    }
  }

  removeAddress() {
    this.removeNestedObjectIfContains('address');
  }

  loadCounterpartiesList(): void {
    this.counterpartyService.get().pipe(
      map(p => p.content),
    ).subscribe(party => {
      this.counterpartiesList = party;
    });
  }

  loadShopTypesList(): void {
    this.shopTypeService.get().pipe(
      map(tp => tp.content),
      map(tp => tp.map(t => {
        return {id: t.id, name: `${t.name} / ${t.manufacturer.name}`};
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
          return {id: s.id, name: `${s.name} / ${s.manufacturer.name}`};
        }))
      ).subscribe(channels => {
      this.salesChannelsList = channels;
    });
  }

  loadShopSpecialization(): void {
    this.shopSpecializationsService.get()
      .pipe(
        map(ss => ss.content),
        map((ss: ShopSpecializationModel[]) => ss.map(s => {
          return {id: s.id, name: `${s.name} / ${s.manufacturer.name}`};
        }))
      ).subscribe(spec => {
      this.shopSpecializationList = spec;
    });
  }

  loadShopDeparts(): void {
    this.shopdepartsService.get()
      .pipe(
        map(sd => sd.content),
        map((sd: ShopDepartModel[]) => sd.map(d => {
          return {id: d.id, name: `${d.name} / ${d.manufacturer.name}`, mId: d.manufacturer.id};
        }))
      ).subscribe(departs => this.shopDepartsList = departs);
  }

  loadManufacturers(): void {
    this.manufacturerService.get()
      .pipe(take(1))
      .subscribe(m => {
        this.manufacturerList = m.content;
      });
  }

  instantiate(options?): ShopModel {
    return {active: true, manufacturers: []} as ShopModel;
  }

  populateFormGroup() {
  }

  formTransform(obj?: any): any {
    if (obj.contacts) {
      const clonedObject = _.cloneDeep(obj);
      clonedObject.contacts.map(cp => {
        console.dir(cp);
        cp.person.birthDate = moment(cp.person.birthDate, 'YYYY-MM-DD')
          .utc()
          .format('YYYY-MM-DDTHH:mm:ss') + ' UTC';
      });
      return clonedObject;
    }
  }
}

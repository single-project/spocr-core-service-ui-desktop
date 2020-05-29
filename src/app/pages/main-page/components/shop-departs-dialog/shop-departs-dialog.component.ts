import { Component, OnInit } from '@angular/core';
import { EntityCardModel } from '../../../../core/models/entity-card.model';
import { ManufacturerModel, ShopDepartModel, ShopModel } from '../../../../core/models/global-reference.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { ShopDepartsService } from '../../../../core/services/shop-departs.service';
import { MessageServiceFacadeService } from '../../../../core/services/message-service-facade.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ManufactureService } from '../../../../core/services/manufacture.service';

@Component({
  selector: 'app-shop-departs-dialog',
  templateUrl: './shop-departs-dialog.component.html',
  styleUrls: ['./shop-departs-dialog.component.scss']
})
export class ShopDepartsDialogComponent extends EntityCardModel<ShopDepartModel> implements OnInit {
  public manufactureList: ManufacturerModel[];

  constructor(
    public dialogRef: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    private messageService: MessageServiceFacadeService,
    public formBuilder: FormBuilder,
    private shopDepartsService: ShopDepartsService,
    private manufactureService: ManufactureService,
  ) {
    super(formBuilder, dialogRef, dialogConfig, shopDepartsService, messageService);
  }

  ngOnInit(): void {
    this.manufactureService.get().subscribe(page => this.manufactureList = page.content);
  }

  buildFormGroup() {
    let e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: e['id'],
      name: [e['name'], Validators.required],
      active: [e['active']],
      manufacturer: [e['manufacturer'], Validators.required]
    });
  }

  instantiate(options?): ShopDepartModel {
    return { active: true };
  }

  populateFormGroup() {
  }

}

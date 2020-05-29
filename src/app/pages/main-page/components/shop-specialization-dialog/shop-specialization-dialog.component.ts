import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { ShopSpecializationsService } from '../../../../core/services/shop-specializations.service';
import {
  ManufacturerModel,
  ShopDepartModel,
  ShopSpecializationModel
} from '../../../../core/models/global-reference.model';
import { MessageServiceFacadeService } from '../../../../core/services/message-service-facade.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ManufactureService } from '../../../../core/services/manufacture.service';
import { EntityCardModel } from '../../../../core/models/entity-card.model';

@Component({
  selector: 'app-shop-specialization-dialog',
  templateUrl: './shop-specialization-dialog.component.html',
  styleUrls: ['./shop-specialization-dialog.component.scss']
})
export class ShopSpecializationDialogComponent extends EntityCardModel<ShopSpecializationModel>  implements OnInit {
public manufactureList: ManufacturerModel[];

  constructor(
    public dialogRef: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    private messageService: MessageServiceFacadeService,
    public formBuilder: FormBuilder,
    private shopSpecializationsService: ShopSpecializationsService,
    private manufactureService: ManufactureService,
) {
    super(formBuilder, dialogRef, dialogConfig, shopSpecializationsService, messageService);
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

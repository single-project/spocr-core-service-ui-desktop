import { Component, OnInit } from '@angular/core';
import { EntityCardModel } from '../../../../core/models/entity-card.model';
import { ShopDepartModel, ShopModel } from '../../../../core/models/global-reference.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { ShopDepartsService } from '../../../../core/services/shop-departs.service';
import { MessageServiceFacadeService } from '../../../../core/services/message-service-facade.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop-departs-dialog',
  templateUrl: './shop-departs-dialog.component.html',
  styleUrls: ['./shop-departs-dialog.component.scss']
})
export class ShopDepartsDialogComponent extends EntityCardModel<ShopDepartModel> implements OnInit {

  constructor(
    public dialogRef: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    private messageService: MessageServiceFacadeService,
    public formBuilder: FormBuilder,
    private shopDepartsService: ShopDepartsService,
    ) {
    super(formBuilder, dialogRef, dialogConfig, shopDepartsService, messageService);
  }

  ngOnInit(): void {
  }

  buildFormGroup() {
  }

  instantiate(options?): ShopDepartModel {
    return undefined;
  }

  populateFormGroup() {
  }

}

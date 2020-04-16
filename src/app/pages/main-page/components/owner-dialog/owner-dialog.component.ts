import { Component, OnInit } from '@angular/core';
import { EntityCardModel } from '../../../../core/models/entity-card.model';
import { CounterpartyModel, OwnerModel } from '../../../../core/models/global-reference.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import { FormBuilder, Validators } from '@angular/forms';
import { CounterpartiesService } from '../../../../core/services/counterparties.service';
import { MessageServiceFacadeService } from '../../../../core/services/message-service-facade.service';
import { OwnerService } from '../../../../core/services/owner.service';

@Component({
  selector: 'app-owner-dialog',
  templateUrl: './owner-dialog.component.html',
  styleUrls: ['./owner-dialog.component.scss']
})
export class OwnerDialogComponent extends EntityCardModel<OwnerModel> implements OnInit {

  constructor(public dialogRef: DynamicDialogRef,
              public dialogConfig: DynamicDialogConfig,
              public formBuilder: FormBuilder,
              private ownerService: OwnerService,
              private messageService: MessageServiceFacadeService,) {
    super(formBuilder, dialogRef, dialogConfig, ownerService, messageService);
  }

  ngOnInit(): void {
  }

  buildFormGroup() {
    let e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: e.id,
      name: [e.name, Validators.required],
      active: e.active,
      version: e.version,
      updatedFields: null
    });
  }

  instantiate(options?): OwnerModel {
    return undefined;
  }

  populateFormGroup() {
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EntityCardModel} from "../../../../core/models/entity-card.model";
import {ManufacturerModel} from "../../../../core/models/global-reference.model";
import {ConfigService} from "../../../../core/services/config.service";
import {ManufactureService} from "../../../../core/services/manufacture.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {MessageServiceFacadeService} from "../../../../core/services/message-service-facade.service";

@Component({
  selector: 'app-manufacture-dialog',
  templateUrl: './manufacture-dialog.component.html',
  styleUrls: ['./manufacture-dialog.component.scss']
})
export class ManufactureDialogComponent extends EntityCardModel<ManufacturerModel> implements OnInit {


  constructor(configService: ConfigService,
              private manufacturerService: ManufactureService,
              public dialogRef: DynamicDialogRef,
              public dialogConfig: DynamicDialogConfig,
              public formBuilder: FormBuilder,
              private messageService: MessageServiceFacadeService) {
    super(formBuilder, dialogRef, dialogConfig, manufacturerService, messageService, configService);
  }


  ngOnInit() {
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

  instantiate(options?): ManufacturerModel {
    return {active: true} as ManufacturerModel;
  }

  populateFormGroup() {
  }
}

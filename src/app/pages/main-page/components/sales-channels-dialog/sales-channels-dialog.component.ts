import {Component} from '@angular/core';
import {EntityCardModel} from "../../../../core/models/entity-card.model";
import {SalesChannelModel, ShopTypeModel} from "../../../../core/models/global-reference.model";
import {ManufactureService} from "../../../../core/services/manufacture.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {FormBuilder, Validators} from "@angular/forms";
import {SalesChannelService} from "../../../../core/services/sales-channel.service";
import {MessageServiceFacadeService} from "../../../../core/services/message-service-facade.service";

@Component({
  selector: 'app-sales-channels-dialog',
  templateUrl: './sales-channels-dialog.component.html',
  styleUrls: ['./sales-channels-dialog.component.scss']
})
export class SalesChannelsDialogComponent extends EntityCardModel<SalesChannelModel> {
  manufactureList;

  constructor(private manufacturerService: ManufactureService,
              public dialogRef: DynamicDialogRef, public dialogConfig: DynamicDialogConfig,
              public formBuilder: FormBuilder, private salesChannelService: SalesChannelService,
              private messageService: MessageServiceFacadeService) {
    super(formBuilder, dialogRef, dialogConfig, salesChannelService, messageService);
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

  populateFormGroup() {

  }

  instantiate(): ShopTypeModel {
    return {active: true} as SalesChannelModel;
  }

  ngOnInit(): void {
    this.manufacturerService.get().subscribe(page => this.manufactureList = page.content);
  }

}

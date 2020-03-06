import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EntityCardModel} from "../../../../core/models/entity-card.model";
import {ShopTypeModel} from "../../../../core/models/global-reference.model";
import {MessageServiceFacadeService} from "../../../../core/services/message-service-facade.service";
import {ShopTypesService} from "../../../../core/services/shop-types.service";
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng';
import {ManufactureService} from "../../../../core/services/manufacture.service";


@Component({
  selector: 'app-shop-type-dialog',
  templateUrl: './shop-type-dialog.component.html',
  styleUrls: ['./shop-type-dialog.component.scss']
})
export class ShopTypeDialogComponent extends EntityCardModel<ShopTypeModel> {
  manufactureList;

  constructor(private manufacturerService: ManufactureService,
              public dialogRef: DynamicDialogRef, public dialogConfig: DynamicDialogConfig,
              public formBuilder: FormBuilder, private shopTypeService: ShopTypesService,
              private messageService: MessageServiceFacadeService) {
    super(formBuilder, dialogRef, dialogConfig, shopTypeService, messageService);
  }

  buildFormGroup(e: ShopTypeModel) {
    console.log(JSON.stringify(e));

    this.entityDialogForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      active: [true],
      manufacturer: [{}, Validators.required]
    });
  }

  populateFormGroup(e: ShopTypeModel) {
    if (e != null) {
      let fields = [{id: e['id']}, {name: e['name']}, {manufacturer: e['manufacturer']}, {active: e['active']}];

      fields.forEach(field => {
        this.entityDialogForm.patchValue({...field});
      })
    }
  }

  ngOnInit() {
    this.manufacturerService.fetchManufacturesData().subscribe(page => this.manufactureList = page.content);
  }

  instantiate(): ShopTypeModel {
    return {} as ShopTypeModel;
  }

}

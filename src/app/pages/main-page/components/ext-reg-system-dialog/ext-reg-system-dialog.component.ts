import {Component, OnInit} from '@angular/core';
import {EntityCardModel} from '../../../../core/models/entity-card.model';
import {ExtRegSystemModel, ShopDepartModel} from '../../../../core/models/global-reference.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng';
import {ExtRegSystemService} from '../../../../core/services/ext-reg-system.service';
import {MessageServiceFacadeService} from '../../../../core/services/message-service-facade.service';

@Component({
  selector: 'app-ext-reg-system-dialog',
  templateUrl: './ext-reg-system-dialog.component.html',
  styleUrls: ['./ext-reg-system-dialog.component.scss']
})
export class ExtRegSystemDialogComponent extends EntityCardModel<ExtRegSystemModel> implements OnInit {

  constructor(
    formBuilder: FormBuilder,
    dialogRef: DynamicDialogRef,
    dialogConfig: DynamicDialogConfig,
    extRegSystemService: ExtRegSystemService,
    messageService: MessageServiceFacadeService,
  ) {
    super(
      formBuilder,
      dialogRef,
      dialogConfig,
      extRegSystemService,
      messageService
    );
  }

  ngOnInit(): void {
  }

  /**
   * [reactive-forms](https://angular.io/guide/reactive-forms)<br/>
   * [reactive-form-validation](https://angular.io/guide/form-validation#reactive-form-validation)
   */
  buildFormGroup() {
    let e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: e['id'],
      name: [e['name'], Validators.required],
      active: [e['active']]
    });
  }

  instantiate(options?): ShopDepartModel {
    return {active: true};
  }

  populateFormGroup() {
  }
}

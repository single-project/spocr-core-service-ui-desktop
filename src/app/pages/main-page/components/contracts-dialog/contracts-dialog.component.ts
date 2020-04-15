import {Component, OnInit} from '@angular/core';
import {EntityCardModel} from '../../../../core/models/entity-card.model';
import {ContractModel, ShopDepartModel} from '../../../../core/models/global-reference.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng';
import {MessageServiceFacadeService} from '../../../../core/services/message-service-facade.service';
import {ContractService} from '../../../../core/services/contract.service';

@Component({
  selector: 'app-contracts-dialog',
  templateUrl: './contracts-dialog.component.html',
  styleUrls: ['./contracts-dialog.component.scss']
})
export class ContractsDialogComponent extends EntityCardModel<ContractModel> implements OnInit {

  constructor(
    formBuilder: FormBuilder,
    dialogRef: DynamicDialogRef,
    dialogConfig: DynamicDialogConfig,
    contractService: ContractService,
    messageService: MessageServiceFacadeService,
  ) {
    super(
      formBuilder,
      dialogRef,
      dialogConfig,
      contractService,
      messageService,
    )
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

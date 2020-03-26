import {Component, OnInit} from '@angular/core';
import {EntityCardModel} from "../../../../core/models/entity-card.model";
import {
  ContractModel,
  CounterpartyModel} from "../../../../core/models/global-reference.model";
import {ConfigService} from "../../../../core/services/config.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {FormBuilder, Validators} from "@angular/forms";
import {CounterpartiesService} from "../../../../core/services/counterparties.service";
import {MessageServiceFacadeService} from "../../../../core/services/message-service-facade.service";
import {ContractService} from "../../../../core/services/contract.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-contract-dialog',
  templateUrl: './contract-dialog.component.html',
  styleUrls: ['./contract-dialog.component.scss']
})
export class ContractDialogComponent extends EntityCardModel<ContractModel> implements OnInit {

  public counterpartiesList: CounterpartyModel[] = [];
  public ruCalLocale;

  constructor(private configService: ConfigService,
              public dialogRef: DynamicDialogRef,
              public dialogConfig: DynamicDialogConfig,
              public formBuilder: FormBuilder,
              private contractService: ContractService,
              private counterpartyService: CounterpartiesService,
              private messageService: MessageServiceFacadeService) {
    super(formBuilder, dialogRef, dialogConfig, contractService, messageService);
    this.ruCalLocale = messageService.ruCalLocale;
  }

  ngOnInit(): void {
    this.loadCounterpartiesList();
  }

  instantiate(options?): ContractModel {
    return {active: true} as ContractModel;
  }

  populateFormGroup() {
  }

  buildFormGroup() {
    let e = this.entity;
    this.entityDialogForm = this.formBuilder.group({
      id: e.id,
      name: [e.name, Validators.required],
      startDate: [e.startDate, Validators.required],
      endDate: [e.endDate, Validators.required],
      comment: e.comment,
      contractNumber: [e.contractNumber, Validators.required],
      counterparty1: [e.counterparty1, Validators.required],
      counterparty2: [e.counterparty2, Validators.required],
      active: e.active,
      version: e.version,
      updatedFields: null
    });
  }

  loadCounterpartiesList(): void {
    this.counterpartyService.get().pipe(
      map(p => p.content),
    ).subscribe(party => {
      this.counterpartiesList = party
    });
  }

}

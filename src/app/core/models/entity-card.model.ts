import {FormBuilder, FormGroup} from "@angular/forms";
import {IdentifiedEntity} from './identified.entity';
import {ErrorModel} from './error.model';
import {IdentifiedEntityService} from '../services/identified-entity.service';
import {MessageServiceFacadeService} from "../services/message-service-facade.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {OnInit} from "@angular/core";

export abstract class EntityCardModel<T extends IdentifiedEntity> implements EntityCardModelI {
  public entity: T;
  public entityDialogForm: FormGroup;

  protected constructor(public formBuilder: FormBuilder,
                        public dialogRef: DynamicDialogRef,
                        public dialogConfig: DynamicDialogConfig,
                        private _entityService: IdentifiedEntityService<T>,
                        private _messageService: MessageServiceFacadeService) {
    this.entity = dialogConfig.data.entity;
    this.build(dialogConfig.data.entity);
  }

  abstract ngOnInit(): void;

  abstract buildFormGroup(e: T);

  abstract populateFormGroup(e: T);

  abstract instantiate(): T;

  post(): void {
    this._entityService.post(this.entityDialogForm.value).subscribe(e => {
      console.log("post success");
    }, e => this.error(e));
  }

  patch(): void {
    console.log(this.entityDialogForm.value);
    this._entityService.patch(this.entityDialogForm.value).subscribe(e => {
      console.log("patch success");
    }, e => this.error(e));
  }

  build(e: T): void {
    if (e == null) {
      e = this.instantiate();
    }
    this.buildFormGroup(e);
    this.populateFormGroup(e);
  }

  save(): void {
    if (this.isNew()) {
      this.post();
    } else {
      this.patch();
    }

    this.close(true);
  }

  isNew() {
    return this.entity === null;
  }

  close(refresh?: boolean): void {
    this.dialogRef.close(refresh);
  }

  error(err: ErrorModel): void {
    console.log(err.message);
    this._messageService.showErrMsg(`${this.dialogConfig.data.resourceKey}.dialog.save.failed`, err.message);
  }

}

interface EntityCardModelI extends OnInit {

  save(): void;

  close(): void;

}

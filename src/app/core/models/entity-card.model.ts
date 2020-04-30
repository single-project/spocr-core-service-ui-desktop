import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {IdentifiedEntity} from './identified.entity';
import {ErrorModel} from './error.model';
import {IdentifiedEntityService} from '../services/identified-entity.service';
import {MessageServiceFacadeService} from '../services/message-service-facade.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng';
import {HostListener} from '@angular/core';
import {ConfigService} from '../services/config.service';

export abstract class EntityCardModel<T extends IdentifiedEntity> implements EntityCardModelI {

  public entity: T;
  public entityDialogForm: FormGroup;

  protected constructor(public formBuilder: FormBuilder,
                        public dialogRef: DynamicDialogRef,
                        public dialogConfig: DynamicDialogConfig,
                        protected entityService: IdentifiedEntityService<T>,
                        protected messageService: MessageServiceFacadeService,
                        public configService?: ConfigService) {
    this.setEntity();
    this.build();
  }

  /**
   * [reactive-forms](https://angular.io/guide/reactive-forms)<br/>
   * [dynamic-form](https://angular.io/guide/dynamic-form)<br/>
   * [reactive-form-validation](https://angular.io/guide/form-validation#reactive-form-validation)
   */
  abstract buildFormGroup();

  // TODO: ранее требовалось создать форму, потом обновить значения их полей теперь не требуется - возможно метод не нужен
  abstract populateFormGroup();

  abstract instantiate(options?): T;

  post(): void {
    const clonedValue = this.formTransform(this.entityDialogForm.value);
    this.entityService.post(clonedValue).subscribe(e => {
      this.messageService.showScsMsg(
        `${this.dialogConfig.data.entityKey}.dialog.save.success`);
    }, e => this.error(e));
  }

  patch(): void {
    this.entityDialogForm.patchValue({updatedFields: this.getUpdatedFields()});
    const clonedValue = this.formTransform(this.entityDialogForm.value);
    this.entityService.patch(clonedValue).subscribe(e => {
      this.messageService.showScsMsg(
        `${this.dialogConfig.data.entityKey}.dialog.save.success`);
    }, e => this.error(e));
  }

  @HostListener('document:keydown', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      this.close(false);
    }
  }

  getUpdatedFields() {
    const dirtyValues = {};
    Object.keys(this.entityDialogForm.controls).forEach(k => {
      const currentControl: AbstractControl = this.entityDialogForm.controls[k];
      if (currentControl.dirty) {
        dirtyValues[k] = currentControl.value;
      }
    });
    return Object.keys(dirtyValues);
  }


  build(): void {
    this.buildFormGroup();
    this.populateFormGroup();
  }

  save(): void {
    if (this.entityDialogForm.invalid) {
      this.showFormValidationErrors();
      return;
    }

    if (this.isNew()) {
      this.post();
    } else {
      this.patch();
    }
    this.close(true);
  }

  formTransform(obj?: any) {
    return obj;
  }

  isNew() {
    return (!this.entity.id);
  }

  close(refresh?: boolean): void {
    this.dialogRef.close(refresh);
  }

  error(err: ErrorModel): void {
    this.messageService.showErrMsg(
      `${this.dialogConfig.data.entityKey}.dialog.save.failed`, err.message);
  }

  // TODO:
  showFormValidationErrors() {
    Object.keys(this.entityDialogForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.entityDialogForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.error(
            new ErrorModel(
              `Поле: ${this.messageService.getMessage(key)}, Ошибка: ${this.messageService.getMessage(keyError) }`));
        });
      }
    });
  }

  addNestedObjectIfNotContains(nestedObjectName: string, nestedObjectConfig: { [key: string]: any; }) {
    if (!this.entityDialogForm.contains(nestedObjectName)) {
      this.entityDialogForm
        .addControl(
          nestedObjectName,
          this.formBuilder.group(nestedObjectConfig));
    }
  }

  removeNestedObjectIfContains(nestedObjectName: string) {
    if (this.entityDialogForm.contains(nestedObjectName)) {
      this.entityDialogForm.removeControl(nestedObjectName);
      this.entity[nestedObjectName] = undefined;
    }
  }

  private setEntity() {
    this.entity = this.dialogConfig.data.entity;
    if (this.entity === undefined) {
      this.entity = this.instantiate();
    }
  }

}

interface EntityCardModelI {

  save(): void;

  close(): void;
}

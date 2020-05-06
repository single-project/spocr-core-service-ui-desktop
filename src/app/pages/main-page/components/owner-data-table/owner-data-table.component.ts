import { Component, OnInit } from '@angular/core';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {OwnerModel} from '../../../../core/models/global-reference.model';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import { DialogService, MessageService } from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {OwnerService} from '../../../../core/services/owner.service';
import { OwnerDialogComponent } from '../owner-dialog/owner-dialog.component';

@Component({
  selector: 'app-owner-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class OwnerDataTableComponent extends AppDataTableModel<OwnerModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    ownerService: OwnerService,
    dialogService: DialogService) {
    super(messageService,
      configService,
      ownerService,
      dialogService,
      OwnerDialogComponent);
  }

  ngOnInit(): void {
    this.entityKey = 'owner';
    this.onInit(
      AppTableTypes.OWNER_TABLE_TYPE);
  }

}

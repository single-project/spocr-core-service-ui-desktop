import {Component, OnInit} from '@angular/core';
import {ManufactureService} from '../../../../core/services/manufacture.service';
import { DialogService, MessageService} from 'primeng';
import {ManufacturerModel} from '../../../../core/models/global-reference.model';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {ManufactureDialogComponent} from '../manufacture-dialog/manufacture-dialog.component';

@Component({
  selector: 'app-manufacture-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class ManufactureDataTableComponent extends AppDataTableModel<ManufacturerModel> implements OnInit {


  constructor(
    messageService: MessageService,
    configService: ConfigService,
    dialogService: DialogService,
    manufactureService: ManufactureService,
  ) {
    super(
      messageService,
      configService,
      manufactureService,
      dialogService,
      ManufactureDialogComponent);
  }

  ngOnInit(): void {
    this.оnInit(
      AppTableTypes.MANUFACTURE_TABLE_TYPE);
  }
}

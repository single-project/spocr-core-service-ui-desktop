import {Component, OnInit} from '@angular/core';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ExtRegSystemModel} from '../../../../core/models/global-reference.model';
import {DialogService, MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {ExtRegSystemService} from '../../../../core/services/ext-reg-system.service';
import {ExtRegSystemDialogComponent} from "../ext-reg-system-dialog/ext-reg-system-dialog.component";

@Component({
  selector: 'app-ext-reg-system-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class ExtRegSystemDataTableComponent extends AppDataTableModel<ExtRegSystemModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    extRegSystemService: ExtRegSystemService,
    dialogService: DialogService,) {
    super(messageService,
      configService,
      extRegSystemService,
      dialogService,
      ExtRegSystemDialogComponent);
  }

  ngOnInit(): void {
    this.оnInit(
      AppTableTypes.EXT_REG_SYSTEM_TABLE_TYPE);
  }

}

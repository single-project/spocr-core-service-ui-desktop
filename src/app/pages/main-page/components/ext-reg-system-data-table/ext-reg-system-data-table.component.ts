import {Component, OnInit} from '@angular/core';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {ExtRegSystemModel} from '../../../../core/models/global-reference.model';
import {MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {ExtRegSystemService} from "../../../../core/services/ext-reg-system.service";

@Component({
  selector: 'app-ext-reg-system-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['../templates/data-table.template.scss']
})
export class ExtRegSystemDataTableComponent extends AppDataTableModel<ExtRegSystemModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    extRegSystemService: ExtRegSystemService) {
    super(messageService,
      configService,
      extRegSystemService);
  }

  ngOnInit(): void {
    this.оnInit(
      AppTableTypes.EXT_REG_SYSTEM_TABLE_TYPE);
  }

}

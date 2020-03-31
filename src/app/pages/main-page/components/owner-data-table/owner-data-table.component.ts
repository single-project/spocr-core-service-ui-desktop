import { Component, OnInit } from '@angular/core';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {OwnerModel} from '../../../../core/models/global-reference.model';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {OwnerService} from '../../../../core/services/owner.service';

@Component({
  selector: 'app-owner-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['./owner-data-table.component.scss']
})
export class OwnerDataTableComponent extends AppDataTableModel<OwnerModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    ownerService: OwnerService) {
    super(messageService,
      configService,
      ownerService);
  }

  ngOnInit(): void {
    this.оnInit(
      AppTableTypes.OWNER_TABLE_TYPE);
  }

}

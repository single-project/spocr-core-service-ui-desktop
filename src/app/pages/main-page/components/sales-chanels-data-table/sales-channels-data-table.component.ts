import {Component, OnInit} from '@angular/core';
import {DialogService, MessageService} from 'primeng';
import {ConfigService} from '../../../../core/services/config.service';
import {AppTableTypes} from '../../../../core/models/app-tabe-types.enum';
import {SalesChannelService} from '../../../../core/services/sales-channel.service';
import {AppDataTableModel} from '../../../../core/models/app-data-table.model';
import {SalesChannelModel} from '../../../../core/models/global-reference.model';
import {SalesChannelsDialogComponent} from "../sales-channels-dialog/sales-channels-dialog.component";

@Component({
  selector: 'app-sales-chanels-data-table',
  templateUrl: '../templates/data-table.template.html',
  styleUrls: ['./sales-channels-data-table.component.scss']
})
export class SalesChannelsDataTableComponent extends AppDataTableModel<SalesChannelModel> implements OnInit {

  constructor(
    messageService: MessageService,
    configService: ConfigService,
    dialogService: DialogService,
    salesChannelsService: SalesChannelService) {
    super(messageService,
      configService,
      salesChannelsService,
      dialogService,
      SalesChannelsDialogComponent);
  }

  ngOnInit(): void {
    this.оnInit(
      AppTableTypes.SALES_CHANELS_TABLE_TYPE);
  }
}

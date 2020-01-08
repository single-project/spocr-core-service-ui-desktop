import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ButtonModule, CardModule, CheckboxModule, DialogModule,
  InputTextModule,
  MenuModule, MessageModule, MessagesModule, MultiSelectModule,
  OverlayPanelModule, PaginatorModule,
  SplitButtonModule,
  TableModule,
  ToolbarModule
} from "primeng";
import { ActiveTagsPipe } from './pipes/active-tags.pipe';
import { ShopsCounterPipe } from './pipes/shops-counter.pipe';




@NgModule({
  declarations: [ActiveTagsPipe, ShopsCounterPipe],
  imports: [
    CommonModule,
    ToolbarModule,
    SplitButtonModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    OverlayPanelModule,
    CheckboxModule,
    MultiSelectModule,
    CardModule,
    PaginatorModule,
    MessagesModule,
    MessageModule,
    DialogModule,


  ],
  exports: [
    ToolbarModule,
    SplitButtonModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    OverlayPanelModule,
    CheckboxModule,
    MultiSelectModule,
    ActiveTagsPipe,
    CardModule,
    PaginatorModule,
    MessagesModule,
    MessageModule,
    ShopsCounterPipe,
    DialogModule,

  ]

})
export class SharedModule {
}

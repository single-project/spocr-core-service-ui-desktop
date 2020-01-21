import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ButtonModule, CardModule, CheckboxModule, DialogModule, DropdownModule,
  InputTextModule,
  MenuModule, MessageModule, MessagesModule, MultiSelectModule,
  OverlayPanelModule, PaginatorModule,
  SplitButtonModule,
  TableModule, ToastModule,
  ToolbarModule
} from "primeng";
import { ActiveTagsPipe } from './pipes/active-tags.pipe';
import {NgxDadataComponent, NgxDadataModule} from "@kolkov/ngx-dadata";





@NgModule({
  declarations: [ActiveTagsPipe,],
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
    DropdownModule,
    MultiSelectModule,
    ToastModule,
    NgxDadataModule,


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
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    ToastModule,
    NgxDadataModule,

  ]

})
export class SharedModule {
}

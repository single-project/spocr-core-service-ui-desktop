import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AutoCompleteModule,
  ButtonModule, CardModule, CheckboxModule, DialogModule, DropdownModule,
  InputTextModule,
  MenuModule, MessageModule, MessagesModule, MultiSelectModule,
  OverlayPanelModule, PaginatorModule,
  SplitButtonModule,
  TableModule, TabMenuModule, ToastModule,
  ToolbarModule
} from 'primeng';
import { ActiveTagsPipe } from './pipes/active-tags.pipe';
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { DadataAddressComponent } from './components/dadata-address/dadata-address.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ ActiveTagsPipe, DadataAddressComponent ],
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
    TabMenuModule,
    AutoCompleteModule,
    ReactiveFormsModule,
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
    TabMenuModule,
    AutoCompleteModule,
    DadataAddressComponent,
  ]
})
export class SharedModule {
}

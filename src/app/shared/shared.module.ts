import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AccordionModule,
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  CheckboxModule,
  DialogModule,
  DialogService,
  DropdownModule,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
  InputMaskModule,
  InputTextModule,
  MenuModule,
  MessageModule,
  MessagesModule,
  MultiSelectModule,
  OverlayPanelModule,
  PaginatorModule,
  SplitButtonModule,
  TableModule,
  TabMenuModule,
  TabViewModule,
  ToastModule,
  ToolbarModule
} from 'primeng';
import {ActiveTagsPipe} from './pipes/active-tags.pipe';
import {NgxDadataModule} from '@kolkov/ngx-dadata';
import {DadataAddressComponent} from './components/dadata-address/dadata-address.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DadataPartyComponent} from './components/dadata-party/dadata-party.component';
import {DadataFioComponent} from './components/dadata-fio/dadata-fio.component';
import { AddRequisiteButtonComponent } from './components/add-requisite-button/add-requisite-button.component';
import {NameTagsPipe} from './pipes/name-tags.pipe';
import {DateTimeTagsPipe} from './pipes/date-time-tags.pipe';
import { ContactPersonsComponent } from './components/contact-persons/contact-persons.component';

@NgModule({
  declarations: [
    NameTagsPipe,
    ActiveTagsPipe,
    DateTimeTagsPipe,
    DadataAddressComponent,
    DadataPartyComponent,
    DadataFioComponent,
    AddRequisiteButtonComponent,
    ContactPersonsComponent
  ],
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
    DynamicDialogModule,
    DropdownModule,
    MultiSelectModule,
    ToastModule,
    NgxDadataModule,
    TabMenuModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    TabViewModule,
    CalendarModule,
    InputMaskModule,
    AccordionModule,
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
    NameTagsPipe,
    DateTimeTagsPipe,
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
    TabViewModule,
    DadataPartyComponent,
    CalendarModule,
    DadataFioComponent,
    InputMaskModule,
    DynamicDialogModule,
    AccordionModule,
    AddRequisiteButtonComponent,
    ContactPersonsComponent,
  ],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ButtonModule, CheckboxModule,
  InputTextModule,
  MenuModule, MultiSelectModule,
  OverlayPanelModule,
  SplitButtonModule,
  TableModule,
  ToolbarModule
} from "primeng";
import { ActiveTagsPipe } from './pipes/active-tags.pipe';




@NgModule({
  declarations: [ActiveTagsPipe],
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

  ]

})
export class SharedModule {
}

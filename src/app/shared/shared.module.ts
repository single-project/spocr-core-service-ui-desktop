import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ButtonModule, CheckboxModule,
  InputTextModule,
  MenuModule,
  OverlayPanelModule,
  SplitButtonModule,
  TableModule,
  ToolbarModule
} from "primeng";



@NgModule({
  declarations: [],
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


  ],
  exports: [
    ToolbarModule,
    SplitButtonModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    OverlayPanelModule,
    CheckboxModule
  ]

})
export class SharedModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageModule} from "../pages/main-page/main-page.module";
import {PagesModule} from "../pages/pages.module";
import {LayoutModule} from "../layout/layout.module";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesModule,
    LayoutModule
  ]
})
export class SharedModule { }

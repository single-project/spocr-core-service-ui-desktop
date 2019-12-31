import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthPageModule} from "./auth-page/auth-page.module";
import {MainPageModule} from "./main-page/main-page.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthPageModule,
    MainPageModule
  ]
})
export class PagesModule { }

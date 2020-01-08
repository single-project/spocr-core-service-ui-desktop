import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthPageComponent} from "./auth-page.component";
import {AuthPageRoutingModule} from "./auth-page-routing.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    SharedModule,
  ]
})
export class AuthPageModule { }

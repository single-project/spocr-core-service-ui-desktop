import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./components/footer/footer.component";
import {MenuComponent} from "./components/menu/menu.component";
import {NavbarComponent} from "./components/navbar/navbar.component";



@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }

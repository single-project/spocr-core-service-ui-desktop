import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {MainPageComponent} from "./main-page.component";
import {LayoutModule} from "../../layout/layout.module";
import {SharedModule} from "../../shared/shared.module";
import { DataTableComponent } from './components/data-table/data-table.component';
import { FiltersPopupInputSetComponent } from './components/filters-popup-input-set/filters-popup-input-set.component';
import { FiltersPopupCheckboxSetComponent } from './components/filters-popup-checkbox-set/filters-popup-checkbox-set.component';
import { ShopDialogComponent } from './components/shop-dialog/shop-dialog.component';
import { ShopTypeDialogComponent } from './components/shop-type-dialog/shop-type-dialog.component';
import { CounterpartyDialogComponent } from './components/counterparty-dialog/counterparty-dialog.component';
import { ManufactureDialogComponent } from './components/manufacture-dialog/manufacture-dialog.component';



@NgModule({
  declarations: [
    MainPageComponent,
    DataTableComponent,
    FiltersPopupInputSetComponent,
    FiltersPopupCheckboxSetComponent,
    ShopDialogComponent,
    ShopTypeDialogComponent,
    CounterpartyDialogComponent,
    ManufactureDialogComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    LayoutModule,
    SharedModule,

  ]
})
export class MainPageModule { }

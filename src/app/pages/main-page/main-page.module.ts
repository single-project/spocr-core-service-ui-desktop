import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageRoutingModule} from './main-page-routing.module';
import {MainPageComponent} from './main-page.component';
import {LayoutModule} from '../../layout/layout.module';
import {SharedModule} from '../../shared/shared.module';
import {FiltersPopupInputSetComponent} from './components/filters-popup-input-set/filters-popup-input-set.component';
import {FiltersPopupCheckboxSetComponent} from './components/filters-popup-checkbox-set/filters-popup-checkbox-set.component';
import {ShopDialogComponent} from './components/shop-dialog/shop-dialog.component';
import {ShopTypeDialogComponent} from './components/shop-type-dialog/shop-type-dialog.component';
import {CounterpartyDialogComponent} from './components/counterparty-dialog/counterparty-dialog.component';
import {ManufactureDialogComponent} from './components/manufacture-dialog/manufacture-dialog.component';
import {ShopDataTableComponent} from './components/shop-data-table/shop-data-table.component';
import {ManufactureDataTableComponent} from './components/manufacture-data-table/manufacture-data-table.component';
import {CounterpartiesDataTableComponent} from './components/counterparties-data-table/counterparties-data-table.component';
import {ShopTypesDataTableComponent} from './components/shop-types-data-table/shop-types-data-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ShopDepartmentsDataTableComponent} from './components/shop-departments-data-table/shop-departments-data-table.component';
import {SalesChannelsDataTableComponent} from './components/sales-chanels-data-table/sales-channels-data-table.component';
import {ShopSpecializationsDataTableComponent} from './components/shop-specializations-data-table/shop-specializations-data-table.component';
import {ContractsDataTableComponent} from './components/contracts-data-table/contracts-data-table.component';
import { SalesChannelsDialogComponent } from './components/sales-channels-dialog/sales-channels-dialog.component';
import { OwnerDataTableComponent } from './components/owner-data-table/owner-data-table.component';
import { ExtRegSystemDataTableComponent } from './components/ext-reg-system-data-table/ext-reg-system-data-table.component';
import { ShopDepartsDialogComponent } from './components/shop-departs-dialog/shop-departs-dialog.component';
import { ShopSpecializationDialogComponent } from './components/shop-specialization-dialog/shop-specialization-dialog.component';
import { OwnerDialogComponent } from './components/owner-dialog/owner-dialog.component';
import {ExtRegSystemDialogComponent} from './components/ext-reg-system-dialog/ext-reg-system-dialog.component';


@NgModule({
  declarations: [
    MainPageComponent,
    FiltersPopupInputSetComponent,
    FiltersPopupCheckboxSetComponent,
    ShopDialogComponent,
    ShopTypeDialogComponent,
    CounterpartyDialogComponent,
    ManufactureDialogComponent,
    ShopDataTableComponent,
    ManufactureDataTableComponent,
    CounterpartiesDataTableComponent,
    ShopTypesDataTableComponent,
    ShopDepartmentsDataTableComponent,
    SalesChannelsDataTableComponent,
    ShopSpecializationsDataTableComponent,
    ContractsDataTableComponent,
    SalesChannelsDialogComponent,
    OwnerDataTableComponent,
    ExtRegSystemDataTableComponent,
    ShopDepartsDialogComponent,
    ShopSpecializationDialogComponent,
    OwnerDialogComponent,
    ExtRegSystemDialogComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    LayoutModule,
    SharedModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ]
})
export class MainPageModule {
}

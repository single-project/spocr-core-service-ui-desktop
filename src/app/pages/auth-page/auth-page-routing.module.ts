import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "./auth-page.component";


const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthPageRoutingModule {
}

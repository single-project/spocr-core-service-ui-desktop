import {Injector, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './main-page.component';

export let MainPageInjector: Injector;

const routes: Routes = [
  {path: '', component: MainPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
  constructor(private injector: Injector) {
    MainPageInjector = this.injector;
  }
}

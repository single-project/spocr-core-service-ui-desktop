import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthPageModule} from './auth-page/auth-page.module';
import {MainPageModule} from './main-page/main-page.module';
import {UserPageModule} from './user-page/user-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthPageModule,
    MainPageModule,
    UserPageModule
  ],
  exports: []
})
export class PagesModule {
}

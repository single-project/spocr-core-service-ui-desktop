import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/auth-page/auth-page.module').then(m => m.AuthPageModule)

  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user-page/user-page.module').then(m => m.UserPageModule),
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

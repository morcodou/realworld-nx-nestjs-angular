import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module')
      .then(m => m.LayoutModule),
    // canActivate: [UserGuardService]
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('@realworld/auth/feature')
  //     .then(m => m.AuthFeatureWebModule)
  // },
  { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'enabled',
  initialNavigation: 'enabled'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

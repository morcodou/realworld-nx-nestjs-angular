import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module')
      .then(m => m.LayoutModule),
  },
  { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
  useHash: true,
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: 'login', 
        loadChildren: () => import('@realworld/user/feature')
          .then(m => m.LoginModule)
      },
      { 
        path: 'register', 
        loadChildren: () => import('@realworld/user/feature')
          .then(m => m.RegisterModule)
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

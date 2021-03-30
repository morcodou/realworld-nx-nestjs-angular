import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: '', 
        loadChildren: () => import('@realworld/article/feature')
          .then(m => m.HomeModule)
      },
      { 
        path: 'editor', 
        loadChildren: () => import('@realworld/article/feature')
          .then(m => m.EditorModule)
      },
      { 
        path: 'article/:slug', 
        loadChildren: () => import('@realworld/article/feature')
          .then(m => m.ViewArticleModule)
      },
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
      { 
        path: 'settings', 
        loadChildren: () => import('@realworld/user/feature')
          .then(m => m.SettingModule)
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

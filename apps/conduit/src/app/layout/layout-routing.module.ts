import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { LayoutComponent } from './layout.component';

export function profilePathMatcher(url: UrlSegment[]) {
  console.log('profilePathMatcher', url)
  return url.length >= 1 && url[0].path.startsWith('@') ? ({consumed: url}) : null;
}

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
        matcher: profilePathMatcher,
        loadChildren: () => import('@realworld/user/feature')
          .then(m => m.ProfileModule),
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

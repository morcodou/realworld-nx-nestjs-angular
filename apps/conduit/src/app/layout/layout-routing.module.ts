import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { AuthGuardService, NotAuthGuardService } from '@realworld/user/shared';
import { LayoutComponent } from './layout.component';

export function profilePathMatcher(url: UrlSegment[]) {
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
        path: 'article/:slug', 
        loadChildren: () => import('@realworld/article/feature')
          .then(m => m.ViewArticleModule)
      },
      { 
        path: 'editor', 
        loadChildren: () => import('@realworld/article/feature')
          .then(m => m.EditorModule),
        canActivate: [AuthGuardService]
      },
      { 
        path: 'settings', 
        loadChildren: () => import('@realworld/user/feature')
          .then(m => m.SettingModule),
        canActivate: [AuthGuardService]
      },
      { 
        path: 'login', 
        loadChildren: () => import('@realworld/user/feature')
          .then(m => m.LoginModule),
        canActivate: [NotAuthGuardService]
      },
      { 
        path: 'register', 
        loadChildren: () => import('@realworld/user/feature')
          .then(m => m.RegisterModule),
        canActivate: [NotAuthGuardService]
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { ListArticlesModule } from '@realworld/article/feature';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    SharedCommonModule,
    ListArticlesModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: 'favorites',
        component: ProfileComponent
      },
    ])
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {}

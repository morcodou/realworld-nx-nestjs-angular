import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    SharedCommonModule,
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

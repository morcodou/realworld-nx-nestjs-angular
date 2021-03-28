import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}

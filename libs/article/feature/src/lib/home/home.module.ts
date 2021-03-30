import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { ListArticlesModule } from '../components/list-articles/list-articles.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedCommonModule,
    ListArticlesModule,
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

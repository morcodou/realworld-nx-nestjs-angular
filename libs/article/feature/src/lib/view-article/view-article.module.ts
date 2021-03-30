import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { ViewArticleComponent } from './view-article.component';

@NgModule({
  imports: [
    SharedCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewArticleComponent
      }
    ])
  ],
  declarations: [ViewArticleComponent]
})
export class ViewArticleModule {}

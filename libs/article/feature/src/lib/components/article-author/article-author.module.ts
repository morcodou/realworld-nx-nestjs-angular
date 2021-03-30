import { NgModule } from '@angular/core';
import { SharedCommonModule } from '@realworld/shared/common';
import { ArticleAuthorComponent } from './article-author.component';

@NgModule({
  imports: [SharedCommonModule],
  declarations: [ArticleAuthorComponent],
  exports: [ArticleAuthorComponent],
})
export class ArticleAuthorModule {}

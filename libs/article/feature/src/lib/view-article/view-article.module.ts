import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { ArticleAuthorModule } from '../components/article-author/article-author.module';
import { MarkdownPipe } from './markdown.pipe';
import { ViewArticleComponent } from './view-article.component';

@NgModule({
  imports: [
    SharedCommonModule,
    ArticleAuthorModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewArticleComponent
      }
    ])
  ],
  declarations: [ViewArticleComponent, MarkdownPipe]
})
export class ViewArticleModule {}

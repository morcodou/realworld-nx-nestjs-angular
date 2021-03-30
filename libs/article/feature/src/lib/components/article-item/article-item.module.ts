import { NgModule } from '@angular/core';
import { SharedCommonModule } from '@realworld/shared/common';
import { ArticleItemComponent } from './article-item.component';

@NgModule({
  imports: [SharedCommonModule],
  declarations: [ArticleItemComponent],
  exports: [ArticleItemComponent],
})
export class ArticleItemModule {}

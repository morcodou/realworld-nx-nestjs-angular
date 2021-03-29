import { NgModule } from "@angular/core";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedCommonModule } from "@realworld/shared/common";
import { ArticleItemModule } from "../article-item/article-item.module";
import { ListArticlesComponent } from "./list-articles.component";

@NgModule({
    declarations: [ListArticlesComponent],
    exports: [ListArticlesComponent],
    imports: [
        SharedCommonModule,
        NgbPaginationModule,
        ArticleItemModule
    ],
})
export class ListArticlesModule {}
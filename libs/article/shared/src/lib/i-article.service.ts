import { Injectable } from "@angular/core";
import { IArticle } from "@realworld/article/api-interfaces";
import { ActionSuccessResponse } from "@realworld/shared/client-server";
import { IBaseDataService, IPage, IPageRequest, IQuery } from "@realworld/shared/foundation";
import { Observable } from "rxjs";
import { ArticleService } from "./article.service";

@Injectable({
    providedIn: 'root',
    useClass: ArticleService
})
export abstract class IArticleService extends IBaseDataService<IArticle> {
    abstract getFeed(req: IPageRequest<IArticle>, query: IQuery, loading?:boolean): Observable<IPage<IArticle>>
    abstract favoriteArticle(slug: string, loading?:boolean): Observable<ActionSuccessResponse<IArticle>>
    abstract unfavoriteArticle(slug: string, loading?:boolean): Observable<ActionSuccessResponse<IArticle>>
}
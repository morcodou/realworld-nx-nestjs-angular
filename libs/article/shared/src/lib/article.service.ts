import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IArticle } from "@realworld/article/api-interfaces";
import { ActionSuccessResponse, ListSuccessResponse } from "@realworld/shared/client-server";
import { IConfigurationService } from "@realworld/shared/configuration";
import { BaseDataService, IPage, IPageRequest, IQuery } from "@realworld/shared/foundation";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IArticleService } from "./i-article.service";

@Injectable()
export class ArticleService extends BaseDataService<IArticle> implements IArticleService {
    protected get endpoint(): string {
        return 'articles'
    }

    constructor(
        config: IConfigurationService,
        protected http: HttpClient
    ) {
        super(config, http)
    }

    getFeed(req: IPageRequest<IArticle>, query: IQuery, loading = true): Observable<IPage<IArticle>> {
        let url = this.getURLFromEndpoint({endpoint: 'articles/feed'})
        this.setLoading(loading ? 'show' : 'not-show')
        let options = this.getAllOptions<IArticle>(req, query)

        return this.http.get<ListSuccessResponse<IArticle>>(url, options).pipe(
            map(res => this.mapGetAllRes<IArticle>(res, req?.pageIndex, req?.limit))
        )
    }

    favoriteArticle(slug: string, loading?: boolean): Observable<ActionSuccessResponse<IArticle>> {
        let url = this.getURLFromEndpoint({endpoint: `articles/${slug}/favorite`})
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}

        return this.http.post<ActionSuccessResponse<IArticle>>(url, null, options)
    }

    unfavoriteArticle(slug: string, loading?: boolean): Observable<ActionSuccessResponse<IArticle>> {
        let url = this.getURLFromEndpoint({endpoint: `articles/${slug}/favorite`})
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}

        return this.http.delete<ActionSuccessResponse<IArticle>>(url, options)
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IComment, INewComment } from "@realworld/article/api-interfaces";
import { ListSuccessResponse, ActionSuccessResponse } from "@realworld/shared/client-server";
import { IConfigurationService } from "@realworld/shared/configuration";
import { BaseDataService, IPage } from "@realworld/shared/foundation";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ICommentService } from "./i-comment.service";

@Injectable()
export class CommentService extends BaseDataService<IComment> implements ICommentService {
    protected get endpoint(): string {
        throw new Error("Please use custom endpoint.")
    }

    constructor(
        config: IConfigurationService,
        protected http: HttpClient
    ) {
        super(config, http)
    }

    getAllComments(slug: string, loading = true): Observable<IPage<IComment>> {
        let url = this.getURLFromEndpoint({ endpoint: `articles/${slug}/comments` })
        this.setLoading(loading ? 'show' : 'not-show')
        let options = this.getAllOptions<IComment>({order: {orderBy: 'createdAt', orderType: 'desc'}}, null)

        return this.http.get<ListSuccessResponse<IComment>>(url, options).pipe(
            map(res => this.mapGetAllRes<IComment>(res, 0, null))
        )
    }

    postComment(slug: string, data: INewComment, loading = true): Observable<ActionSuccessResponse<IComment>> {
        let url = this.getURLFromEndpoint({ endpoint: `articles/${slug}/comments` })
        this.setLoading(loading ? 'show' : 'not-show')
        let options = { ...this.defaultOptions }
        return this.http.post<ActionSuccessResponse<IComment>>(url, data, options)
    }
    
    deleteComments(slug: string, id: string, loading = true): Observable<ActionSuccessResponse<null>> {
        let url = this.getURLFromEndpoint({ endpoint: `articles/${slug}/comments/${id}` })
        this.setLoading(loading ? 'show' : 'not-show')
        let options = { ...this.defaultOptions }
        return this.http.delete<ActionSuccessResponse<null>>(url, options)
    }
}
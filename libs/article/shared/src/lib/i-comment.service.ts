import { Injectable } from "@angular/core";
import { IComment, INewComment } from "@realworld/article/api-interfaces";
import { ActionSuccessResponse } from "@realworld/shared/client-server";
import { IBaseDataService, IPage } from "@realworld/shared/foundation";
import { Observable } from "rxjs";
import { CommentService } from "./comment.service";

@Injectable({
    providedIn: 'root',
    useClass: CommentService
})
export abstract class ICommentService extends IBaseDataService<IComment> {
    abstract getAllComments(slug: string, loading?:boolean): Observable<IPage<IComment>>
    abstract postComment(slug: string, data: INewComment, loading?:boolean): Observable<ActionSuccessResponse<IComment>>
    abstract deleteComments(slug: string, id: string, loading?:boolean): Observable<ActionSuccessResponse<null>>
}
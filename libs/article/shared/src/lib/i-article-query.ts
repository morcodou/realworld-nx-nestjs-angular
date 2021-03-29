import { IQuery } from "@realworld/shared/foundation";

export interface IArticleQuery extends IQuery {
    tag: string
    favorited: string
    author: string
}
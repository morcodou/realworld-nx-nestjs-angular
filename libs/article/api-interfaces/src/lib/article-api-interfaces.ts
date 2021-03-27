import { IBase } from '@realworld/shared/client-server'
import { IProfile } from '@realworld/user/api-interfaces'
import { Length } from 'class-validator'
export abstract class IArticle extends IBase {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: IProfile
} 

export abstract class INewArticle {
  @Length(1, 200)
  title: string
  @Length(1, 255)
  description: string
  @Length(1, 2000)
  body: string
  tagList: string[]
} 

export abstract class IUpdateArticle {
  @Length(1, 200)
  title: string
  @Length(1, 255)
  description: string
  @Length(1, 2000)
  body: string
} 

export abstract class IComment extends IBase {
  body: string
  author: IProfile
}

export abstract class INewComment {
  @Length(1, 1000)
  body: string
} 

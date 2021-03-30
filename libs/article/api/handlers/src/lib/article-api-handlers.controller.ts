import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IArticle, IComment, INewArticle, INewComment, IUpdateArticle } from '@realworld/article/api-interfaces';
import { Article, ArticleService, Favorite, FavoriteService, TagService, Comment, CommentService } from '@realworld/article/api/shared';
import { CREATED_MSG, DELETED_MSG, NOT_FOUND_MSG, UPDATED_MSG } from '@realworld/shared/api/constants';
import { mapQueriesToFindManyOptions } from '@realworld/shared/api/foundation';
import { ActionSuccessResponse, DetailSuccessResponse, IResponse, ListSuccessResponse } from '@realworld/shared/client-server';
import { StringUtil } from '@realworld/shared/string-util';
import { Follow, FollowService, SkipAuth, UserService } from '@realworld/user/api/shared';
import { In, Like } from 'typeorm';

@Controller()
export class ArticleApiHandlersController {
    constructor(
        private articleService: ArticleService,
        private userService: UserService,
        private favoriteService: FavoriteService,
        private followService: FollowService,
        private tagService: TagService,
        private commentService: CommentService,
    ) { }

    // Article apis

    @Post('articles')
    async create(@Req() req, @Body() data: Partial<INewArticle>): Promise<IResponse<IArticle>> {
        console.log('create article', req.user, data)
        delete (data as any)?.id 

        let article: Partial<Article> = {
            ...data,
            authorId: req?.user?.sub,
            slug: StringUtil.asciiSlug(data.title) + '-' + new Date().getTime()
        }
        await this.articleService.insert(article)

        if (data.tagList) {
            this.updateTags(data.tagList)
        }

        return new ActionSuccessResponse<IArticle>({
            message: CREATED_MSG,
            data: await this.mapToResponseArticle(article?.authorId, article as Article)
        })
    }

    @Put('articles/:slug')
    async update(@Req() req, @Param('slug') slug, @Body() data: Partial<IUpdateArticle>): Promise<IResponse<IArticle>> {
        const { title, description, body } = data
        let article: Partial<Article> = {}
        if (title) { article.title = title }
        if (description) { article.description = description }
        if (body) { article.body = body }

        await this.articleService.update({ slug: slug }, article)
        article = await this.articleService.findOne({ slug: slug })
        return new ActionSuccessResponse<IArticle>({
            message: UPDATED_MSG,
            data: await this.mapToResponseArticle(req?.user?.sub, article as Article)
        })
    }

    @Delete('articles/:slug')
    async delete(@Param('slug') slug: string): Promise<IResponse<null>> {
        const article = await this.articleService.findOne({slug: slug})
        if (!article) {
            throw new NotFoundException(NOT_FOUND_MSG)
        }

        await this.articleService.softDelete({ slug: slug })

        return new ActionSuccessResponse({
            message: DELETED_MSG,
            data: null
        })
    }

    @SkipAuth()
    @Get('articles/:slug')
    async findBySlug(@Req() req, @Param('slug') slug: string): Promise<IResponse<IArticle>> {
        let article = await this.articleService.findOne({ slug: slug })
        if (!article) {
            throw new NotFoundException(NOT_FOUND_MSG)
        }

        return new DetailSuccessResponse<IArticle>({
            detailData: await this.mapToResponseArticle(req?.user?.sub, article)
        })
    }

    @SkipAuth()
    @Get('articles')
    async findAll(@Req() req, @Query() query): Promise<IResponse<IArticle>> {
        const {tag, author, favorited} = query
        delete query.author
        delete query.tag
        delete query.favorited

        if (author) {
            const user = await this.userService.findOne({username: author})
            if (user) {query.authorId = user.id} 
        }
        if (tag) { query.tagList = Like(`%${tag}%`) }

        const options = mapQueriesToFindManyOptions<Article>(query, 'title', 'slug', 'shortDescription', 'body')

        if (favorited) {
            options.relations = ['favorite'];
            const user = await this.userService.findOne({username: favorited});
            if (user) {
                (options.where as any[]).forEach(c => {
                    return {...c, userId: user.id}
                });
            }
        }


        let res = await this.articleService.findAll(options)
        return new ListSuccessResponse<IArticle>({
            listData: await Promise.all(res.map(a => this.mapToResponseArticle(req?.user?.sub, a))),
            total: await this.articleService.count(options)
        })
    }
    
    @Get('articles/feed')
    async findAllFeed(@Req() req, @Query() query): Promise<IResponse<IArticle>> {
        const follows = await this.followService.findAll(mapQueriesToFindManyOptions<Follow>({followerId: req?.user?.sub}))
        const followedIds = follows.map(f => f.followedId)

        const options = mapQueriesToFindManyOptions<Article>({
            ...query,
            authorId: In(followedIds)
        })
        let res = await this.articleService.findAll(options)

        return new ListSuccessResponse<IArticle>({
            listData: await Promise.all(res.map(a => this.mapToResponseArticle(req?.user?.sub, a))),
            total: await this.articleService.count(options)
        })
    }

    // Favorite apis

    @Post('articles/:slug/favorite')
    async favoriteAnArticle(@Req() req, @Param('slug') slug): Promise<IResponse<IArticle>> {
        const isFavorited = !!this.favoriteService.findOne({userId: req?.user?.sub, articleSlug: slug})
        if (!isFavorited) {
            await this.favoriteService.insert({userId: req?.user?.sub, articleSlug: slug})
        }
        const article = await this.articleService.findOne({ slug: slug })
        return new ActionSuccessResponse<IArticle>({
            message: '',
            data: await this.mapToResponseArticle(req?.user?.sub, article as Article)
        })
    }
    
    @Delete('articles/:slug/favorite')
    async unfavoriteAnArticle(@Req() req, @Param('slug') slug): Promise<IResponse<IArticle>> {
        const isFavorited = !!this.favoriteService.findOne({userId: req?.user?.sub, articleSlug: slug})
        if (isFavorited) {
            await this.favoriteService.softDelete({userId: req?.user?.sub, articleSlug: slug})
        }
        const article = await this.articleService.findOne({ slug: slug })
        return new ActionSuccessResponse<IArticle>({
            message: '',
            data: await this.mapToResponseArticle(req?.user?.sub, article as Article)
        })
    }

    // Comment apis

    @Get('articles/:slug/comments')
    async findAllComments(@Req() req, @Param('slug') slug: string): Promise<IResponse<IComment>> {
        const options = mapQueriesToFindManyOptions<Comment>({articleSlug: slug})
        let res = await this.commentService.findAll(options)

        return new ListSuccessResponse<IComment>({
            listData: await Promise.all(res.map(c => this.mapToResponseComment(req?.user?.sub, c))),
            total: await this.commentService.count(options)
        })
    }
    
    @Post('articles/:slug/comments')
    async createAComment(@Req() req, @Param('slug') slug: string, @Body() data: INewComment): Promise<IResponse<IComment>> {
        let comment: Partial<Comment> = {
            ...data,
            authorId: req?.user?.sub,
            articleSlug: slug
        }
        await this.commentService.insert(comment)

        return new ActionSuccessResponse<IComment>({
            message: '',
            data: await this.mapToResponseComment(comment?.authorId, comment as Comment)
        })
    }
    
    @Delete('articles/:slug/comments/:id')
    async deleteAComment(@Param('slug') slug: string, @Param('id') id: string): Promise<IResponse<null>> {
        await this.commentService.softDelete({articleSlug: slug, id: id})
        return new ActionSuccessResponse({
            message: DELETED_MSG,
            data: null
        })
    }

    // Tag apis

    @SkipAuth()
    @Get('tags')
    async findAllTags(@Req() req, @Query() query): Promise<IResponse<string>> {
        let tags = await this.tagService.findAll()

        return new ListSuccessResponse<string>({
            listData: tags.map(t => t.name),
            total: await this.tagService.count()
        })
    }

    // Helper functions

    private updateTags(tagList: string[]) {
        tagList.forEach(async t => {
            t = t.trim()
            const tagExists = !!(await this.tagService.findOne({name: t}))
            if (!tagExists) {
                this.tagService.insert({name: t})
            }
            
        })
    }

    private async didUserFavoriteThisArticle(userId: string, slug: string): Promise<boolean> {
        return !!(await this.favoriteService.findOne({userId: userId, articleSlug: slug}))
    }

    private async getArticleFavoritesCount(slug: string): Promise<number> {
        const options = mapQueriesToFindManyOptions<Favorite>({articleSlug: slug})
        return await this.favoriteService.count(options)
    }

    mapToResponseArticle = async (requestUserId: string, article: Article): Promise<IArticle> => {
        return {
            ...article,
            favorited: requestUserId ? await this.didUserFavoriteThisArticle(requestUserId, article?.slug) : false,
            favoritesCount: await this.getArticleFavoritesCount(article?.slug),
            author: await this.userService.getProfile(requestUserId, article?.authorId, 'id')
        }
    }

    mapToResponseComment = async (requestUserId: string, comment: Comment): Promise<IComment> => {
        return {
            ...comment,
            author: await this.userService.getProfile(requestUserId, comment?.authorId, 'id')
        }
    }
}

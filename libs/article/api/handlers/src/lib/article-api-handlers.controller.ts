import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IArticle, INewArticle, IUpdateArticle } from '@realworld/article/api-interfaces';
import { Article, ArticleService, Favorite, FavoriteService } from '@realworld/article/api/shared';
import { CREATED_MSG, DELETED_MSG, MISSING_REQUIRED_FIELDS_MSG, NOT_FOUND_MSG, UPDATED_MSG } from '@realworld/shared/api/constants';
import { mapQueriesToFindManyOptions } from '@realworld/shared/api/foundation';
import { ActionSuccessResponse, DetailSuccessResponse, ListSuccessResponse } from '@realworld/shared/client-server';
import { StringUtil } from '@realworld/shared/string-util';
import { SkipAuth, UserService } from '@realworld/user/api/shared';

@Controller()
export class ArticleApiHandlersController {
    constructor(
        private articleService: ArticleService,
        private userService: UserService,
        private favoriteService: FavoriteService
    ) { }

    @Post('articles')
    async create(@Req() req, @Body() data: Partial<INewArticle>) {
        let article: Partial<Article> = {
            ...data,
            authorUsername: req?.user?.sub,
            slug: StringUtil.asciiSlug(data.title) + '-' + new Date().getTime()
        }

        await this.articleService.insert(article)
        return new ActionSuccessResponse<IArticle>({
            message: CREATED_MSG,
            data: await this.mapToResponse(article?.authorUsername, article as Article)
        })
    }

    @Put('articles/:slug')
    async update(@Req() req, @Param('slug') slug, @Body() data: Partial<IUpdateArticle>) {
        const { title, description, body } = data
        let article: Partial<Article> = {}
        if (title) { article.title = title }
        if (description) { article.description = description }
        if (body) { article.body = body }

        await this.articleService.update({ slug: slug }, article)
        article = await this.articleService.findOne({ slug: slug })
        return new ActionSuccessResponse<IArticle>({
            message: UPDATED_MSG,
            data: await this.mapToResponse(req?.user?.sub, article as Article)
        })
    }

    @Delete('articles/:slug')
    async delete(@Param('slug') slug: string) {
        if (!slug) {
            throw new BadRequestException(MISSING_REQUIRED_FIELDS_MSG)
        }
        await this.articleService.softDelete({ slug: slug })
        return new ActionSuccessResponse({
            message: DELETED_MSG,
            data: null
        })
    }

    @SkipAuth()
    @Get('articles/:slug')
    async findBySlug(@Req() req, @Param('slug') slug: string) {
        let article = await this.articleService.findOne({ slug: slug })
        if (!article) {
            throw new NotFoundException(NOT_FOUND_MSG)
        }

        return new DetailSuccessResponse<IArticle>({
            detailData: await this.mapToResponse(req?.user?.sub, article)
        })
    }

    @SkipAuth()
    @Get('articles')
    async findAll(@Req() req, @Query() query) {
        const options = mapQueriesToFindManyOptions<Article>(query, 'title', 'slug', 'shortDescription', 'body')
        let res = await this.articleService.findAll(options)

        return new ListSuccessResponse<IArticle>({
            listData: await Promise.all(res.map(a => this.mapToResponse(req?.user?.sub, a))),
            total: await this.articleService.count(options)
        })
    }

    private async didUserFavoriteThisArticle(username: string, slug: string): Promise<boolean> {
        return !!(await this.favoriteService.findOne({username: username, articleSlug: slug}))
    }

    private async getArticleFavoritesCount(slug: string): Promise<number> {
        const options = mapQueriesToFindManyOptions<Favorite>({articleSlug: slug})
        return await this.favoriteService.count(options)
    }

    mapToResponse = async (requestUsername: string, article: Article): Promise<IArticle> => {
        return {
            ...article,
            favorited: await this.didUserFavoriteThisArticle(requestUsername, article?.slug),
            favoritesCount: await this.getArticleFavoritesCount(article?.slug),
            author: await this.userService.getProfile(requestUsername, article?.authorUsername)
        }
    }
}

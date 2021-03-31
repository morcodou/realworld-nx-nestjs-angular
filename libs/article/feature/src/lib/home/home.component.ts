import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IUserService } from '@realworld/user/shared';
import { IArticleQuery, IArticleService, ITagService } from '@realworld/article/shared';
import { IOrder, PaginatedDataSource } from '@realworld/shared/foundation';
import { IArticle } from '@realworld/article/api-interfaces';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'realworld-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource: PaginatedDataSource<IArticle>
  feedType: 'global'|'personal'|'tag'
  selectedTag: string
  tags$: Observable<string[]>

  constructor(
    public userService: IUserService,
    private articleService: IArticleService,
    private tagService: ITagService,
    private title: Title,
    private router: Router
  ) {}

  ngOnInit() {
    this.title.setTitle('Realworld - Home')
    if (this.userService?.isAuth) {
      this.toggleFeed('personal')
    } else {
      this.toggleFeed('global')
    }
    
    this.tags$ = this.tagService.getAll({
      limit: 10, 
      pageIndex: 0, 
      order: {orderBy: 'count' as any, orderType: 'desc'}
    }, null).pipe(map(res => res.data))
  }

  toggleFeed(feedType: 'global'|'personal'|'tag', tag?: string) {
    this.feedType = feedType
    this.selectedTag = tag

    switch (feedType) {
      case 'global':
        this.dataSource = new PaginatedDataSource<IArticle>(
          (req, query) => this.articleService.getAll(req, query),
          <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
          <IArticleQuery>{},
          0,
          10
        )
        break
      case 'personal':
        this.dataSource = new PaginatedDataSource<IArticle>(
          (req, query) => this.articleService.getFeed(req, query),
          <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
          <IArticleQuery>{},
          0,
          10
        )
        break
      case 'tag':
        this.dataSource = new PaginatedDataSource<IArticle>(
          (req, query) => this.articleService.getAll(req, query),
          <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
          <IArticleQuery>{tag: this.selectedTag},
          0,
          10
        )
        break
    }
  }

  async toggleFavorite($event: {favorite: boolean, slug: string}) {
    if (!this.userService?.isAuth) {
      this.router.navigateByUrl('/login')
      return
    }

    if ($event.favorite) {
      await this.articleService.favoriteArticle($event.slug).pipe(take(1)).toPromise()
    } else {
      await this.articleService.unfavoriteArticle($event.slug).pipe(take(1)).toPromise()
    }
    this.dataSource.fetch()
  }
}

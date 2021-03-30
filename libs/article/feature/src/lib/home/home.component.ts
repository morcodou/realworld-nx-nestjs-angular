import { Component, OnInit } from '@angular/core';
import { IUserService } from '@realworld/user/shared';
import { IArticleQuery, IArticleService, ITagService } from '@realworld/article/shared';
import { IOrder, PaginatedDataSource } from '@realworld/shared/foundation';
import { IArticle } from '@realworld/article/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    private tagService: ITagService
  ) {}

  ngOnInit() {
    this.toggleFeed('global')
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

}

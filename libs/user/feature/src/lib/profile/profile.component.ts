import { Component, OnInit } from '@angular/core';
import { IUserService } from '@realworld/user/shared';
import { IArticleQuery, IArticleService, ITagService } from '@realworld/article/shared';
import { IOrder, PaginatedDataSource } from '@realworld/shared/foundation';
import { IArticle } from '@realworld/article/api-interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'realworld-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataSource: PaginatedDataSource<IArticle>
  tabType: 'myArticles'|'favoritedArticles'

  constructor(
    public userService: IUserService,
    private articleService: IArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.url)
  }

  toggleTab(tabType: 'myArticles'|'favoritedArticles') {
    this.tabType = tabType

    switch (tabType) {
      case 'myArticles':
        this.dataSource = new PaginatedDataSource<IArticle>(
          (req, query) => this.articleService.getAll(req, query),
          <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
          <IArticleQuery>{},
          0,
          10
        )
        break
      case 'favoritedArticles':
        this.dataSource = new PaginatedDataSource<IArticle>(
          (req, query) => this.articleService.getFeed(req, query),
          <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
          <IArticleQuery>{},
          0,
          10
        )
        break
    }
  }

  async toggleFavorite($event: {favorite: boolean, slug: string}) {
    if ($event.favorite) {
      await this.articleService.favoriteArticle($event.slug).toPromise()
    } else {
      await this.articleService.unfavoriteArticle($event.slug).toPromise()
    }
    this.dataSource.fetch()
  }
}

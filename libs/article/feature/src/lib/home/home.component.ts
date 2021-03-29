import { Component, OnInit } from '@angular/core';
import { IUserService } from '@realworld/user/shared';
import { IArticleQuery, IArticleService } from '@realworld/article/shared';
import { IOrder, PaginatedDataSource } from '@realworld/shared/foundation';
import { IArticle } from '@realworld/article/api-interfaces';

@Component({
  selector: 'realworld-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource: PaginatedDataSource<IArticle>
  inPersonalFeedTab: boolean

  constructor(
    public userService: IUserService,
    private articleService: IArticleService
  ) {}

  ngOnInit() {
    this.toggleFeed()
  }

  toggleFeed(personal = false) {
    this.inPersonalFeedTab = personal

    if (personal) {
      this.dataSource = new PaginatedDataSource<IArticle>(
        (req, query) => this.articleService.getFeed(req, query),
        <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
        <IArticleQuery>{},
        0,
        10
      )
      return 
    }

    this.dataSource = new PaginatedDataSource<IArticle>(
      (req, query) => this.articleService.getAll(req, query),
      <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
      <IArticleQuery>{},
      0,
      10
    )
  }

}

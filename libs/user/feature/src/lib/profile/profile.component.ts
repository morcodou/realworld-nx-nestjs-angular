import { Component, OnInit } from '@angular/core';
import { IProfileService, IUserService } from '@realworld/user/shared';
import { IArticleQuery, IArticleService, ITagService } from '@realworld/article/shared';
import { IOrder, PaginatedDataSource } from '@realworld/shared/foundation';
import { IArticle } from '@realworld/article/api-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfile } from '@realworld/user/api-interfaces';
import { ActionSuccessResponse } from '@realworld/shared/client-server';

@Component({
  selector: 'realworld-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataSource: PaginatedDataSource<IArticle>
  tabType: 'myArticles'|'favoritedArticles'
  profile: IProfile

  constructor(
    public userService: IUserService,
    private articleService: IArticleService,
    private profileService: IProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const username = this.route.snapshot?.parent?.url[0]?.path.substring(1).toLocaleLowerCase()
      this.profile = (await this.profileService.getProfile(username).toPromise())?.detailData as IProfile
      // this.toggleTab('favoritedArticles', username)
    } catch(error) {
      this.router.navigateByUrl('/')
      throw error
    }
  }

  toggleTab(tabType: 'myArticles'|'favoritedArticles', username: string) {
    this.tabType = tabType

    switch (tabType) {
      case 'myArticles':
        this.dataSource = new PaginatedDataSource<IArticle>(
          (req, query) => this.articleService.getAll(req, query),
          <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
          <IArticleQuery>{author: username},
          0,
          10
        )
        break
      case 'favoritedArticles':
        this.dataSource = new PaginatedDataSource<IArticle>(
          (req, query) => this.articleService.getAll(req, query),
          <IOrder<IArticle>>{ orderBy: 'createdAt', orderType: 'desc' },
          <IArticleQuery>{favorited: username},
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

  async toggleFollow($event: boolean) {
    if (!this.userService?.isAuth) {
      this.router.navigateByUrl('/login')
      return
    }

    let promise: Promise<ActionSuccessResponse<IProfile>>
    if ($event) {
      promise = this.profileService.followAUser(this.profile?.username).toPromise()
    } else {
      promise = this.profileService.unfollowAUser(this.profile?.username).toPromise()
    }

    const res = await promise
    this.profile = res.data as IProfile
  }
}

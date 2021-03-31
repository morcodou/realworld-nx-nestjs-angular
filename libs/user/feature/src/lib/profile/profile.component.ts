import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '@realworld/article/api-interfaces';
import { IArticleQuery, IArticleService } from '@realworld/article/shared';
import { ActionSuccessResponse } from '@realworld/shared/client-server';
import { IOrder, PaginatedDataSource } from '@realworld/shared/foundation';
import { IProfile } from '@realworld/user/api-interfaces';
import { IProfileService, IUserService } from '@realworld/user/shared';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'realworld-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataSource: PaginatedDataSource<IArticle>
  tabType: 'myArticles'|'favoritedArticles'
  profile: IProfile
  private destroyed = new Subject()

  constructor(
    public userService: IUserService,
    private articleService: IArticleService,
    private profileService: IProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  async ngOnInit() {
    this.route.parent.url.pipe(takeUntil(this.destroyed)).subscribe(async pUrl => {
      try {
        const username = pUrl[0]?.path.substring(1).toLocaleLowerCase()
        this.profile = (await this.profileService.getProfile(username).pipe(take(1)).toPromise())?.detailData as IProfile
        this.title.setTitle('Realworld - Profile '+ this.profile?.username)
        if (pUrl.length > 1) {
          this.toggleTab('favoritedArticles', username)
        } else {
          this.toggleTab('myArticles', username)
        }
      } catch(error) {
        this.router.navigateByUrl('/')
        throw error
      }
    })
    
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
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

  async toggleFollow($event: boolean) {
    if (!this.userService?.isAuth) {
      this.router.navigateByUrl('/login')
      return
    }

    let promise: Promise<ActionSuccessResponse<IProfile>>
    if ($event) {
      promise = this.profileService.followAUser(this.profile?.username).pipe(take(1)).toPromise()
    } else {
      promise = this.profileService.unfollowAUser(this.profile?.username).pipe(take(1)).toPromise()
    }

    const res = await promise
    this.profile = res.data as IProfile
  }
}

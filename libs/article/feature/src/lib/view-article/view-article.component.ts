import { Component, OnInit } from '@angular/core';
import { IArticleService, ITagService } from '@realworld/article/shared';
import { IUserService } from '@realworld/user/shared';

@Component({
  selector: 'realworld-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {

  constructor(
    public userService: IUserService,
    private articleService: IArticleService,
    private tagService: ITagService
  ) { }

  ngOnInit() {
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from '@realworld/article/api-interfaces';
import { IUser } from '@realworld/user/api-interfaces';

@Component({
  selector: 'realworld-article-author',
  templateUrl: './article-author.component.html',
  styleUrls: ['./article-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleAuthorComponent implements OnInit {
  @Input() article: IArticle
  @Input() currentUser: IUser

  @Output() toggleFavorite = new EventEmitter<boolean>()
  @Output() toggleFollow = new EventEmitter<boolean>()
  @Output() delete = new EventEmitter<void>()

  constructor() { 
  }

  async ngOnInit() {
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from '@realworld/article/api-interfaces';

@Component({
  selector: 'realworld-article-author',
  templateUrl: './article-author.component.html',
  styleUrls: ['./article-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleAuthorComponent implements OnInit {
  @Input() article: IArticle
  @Output() toggleFavorite = new EventEmitter<boolean>()
  @Output() toggleFollow = new EventEmitter<boolean>()

  constructor() { 
  }

  async ngOnInit() {
  }

}

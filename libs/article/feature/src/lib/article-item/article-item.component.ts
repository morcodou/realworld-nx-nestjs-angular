import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from '@realworld/article/api-interfaces';

@Component({
  selector: 'realworld-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItemComponent implements OnInit {
  @Input() article: IArticle
  @Input()
  displayTags: boolean

  @Output() toggleFavorite = new EventEmitter<boolean>()

  constructor() { 
  }

  async ngOnInit() {
  }

}

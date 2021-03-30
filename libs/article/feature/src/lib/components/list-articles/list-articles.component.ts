import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from '@realworld/article/api-interfaces';

@Component({
  selector: 'realworld-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListArticlesComponent implements OnInit {
  @Input()
  articles: IArticle[]
  @Input() 
  pageSize: number
  @Input() 
  collectionSize: number
  // page start at 1
  @Input() 
  page: number

  @Output() 
  pageChange = new EventEmitter<number>()

  @Output() toggleFavorite = new EventEmitter<{favorite: boolean, slug: string}>()

  constructor() { }

  ngOnInit(): void {
  }

}

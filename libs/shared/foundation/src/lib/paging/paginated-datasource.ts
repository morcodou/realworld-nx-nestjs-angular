import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs'
import { map, share, startWith, switchMap } from 'rxjs/operators'
import { IPage, IOrder, PaginatedRequest, IQuery } from './paging-types'
import { IEndpoint } from '../service/i-endpoint'

export interface SimpleDataSource<T> extends DataSource<T> {
    connect(): Observable<T[]>
    disconnect(): void
}

// https://medium.com/angular-in-depth/angular-material-pagination-datasource-73080d3457fe
export class PaginatedDataSource<T> implements SimpleDataSource<T> {
    private currentPageIndex = 0
    private pageIndex = new Subject<number>()
    private order: BehaviorSubject<IOrder<T>>
    private query: BehaviorSubject<IQuery>
    public page$: Observable<IPage<T>>

    constructor(
        request: PaginatedRequest<T>,
        initialOrder: IOrder<T>,
        initialQuery: IQuery,
        initialPageIndex: number | null,
        limit: number | null,
        endpoint?: IEndpoint
    ) {
        this.query = new BehaviorSubject<IQuery>(initialQuery)
        this.order = new BehaviorSubject<IOrder<T>>(initialOrder)
        const param$ = combineLatest([this.query, this.order])

        this.page$ = param$.pipe(
            switchMap(([query, order]) =>
                this.pageIndex.pipe(
                    startWith(initialPageIndex),
                    switchMap(pageIndex => {
                        this.currentPageIndex = pageIndex
                        if (endpoint) {
                            return request({ pageIndex, order, limit }, query, endpoint)
                        }
                        return request({ pageIndex, order, limit }, query)
                    })
                )
            ),
            share()
        )
    }

    orderBy(order: Partial<IOrder<T>>) {
        const lastOrder = this.order.getValue()
        const nextOrder = { ...lastOrder, ...order }
        this.order.next(nextOrder)
    }

    queryBy(query: Partial<IQuery>) {
        const lastQuery = this.query.getValue()
        const nextQuery = { ...lastQuery, ...query }
        this.query.next(nextQuery)
    }

    fetch(pageIndex?: number): void {
        if (pageIndex === undefined || pageIndex === null) {
            pageIndex = this.currentPageIndex
        }
        this.pageIndex.next(pageIndex)
    }

    connect(): Observable<T[]> {
        return this.page$.pipe(map(page => page.data))
    }

    disconnect(): void { }
}

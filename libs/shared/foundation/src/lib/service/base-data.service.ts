import { HttpClient } from '@angular/common/http'
import { ActionSuccessResponse, DetailSuccessResponse, ListSuccessResponse } from '@realworld/shared/client-server'
import { IConfigurationService } from '@realworld/shared/configuration'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IPage, IPageRequest, IQuery } from '../paging/paging-types'
import { BaseService } from "./base.service"
import { IBaseDataService } from './i-base-data.service'

export abstract class BaseDataService<T> extends BaseService implements IBaseDataService<T> {
    constructor(
        configuration: IConfigurationService,
        protected http: HttpClient
    ) {
        super(configuration)
    }
    
    getOne(id: string, loading = true): Observable<DetailSuccessResponse<T>> {
        let url = this.getURL(id)
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.get<DetailSuccessResponse<T>>(url, options)
    }

    getAll(req: IPageRequest<T>, query: IQuery, loading = true): Observable<IPage<T>> {
        let url = this.getURL()
        this.setLoading(loading ? 'show' : 'not-show')
        let options = this.getAllOptions<T>(req, query)

        return this.http.get<ListSuccessResponse<T>>(url, options).pipe(
            map(res => this.mapGetAllRes<T>(res, req?.pageIndex, req?.limit))
        )
    }

    create(body: Partial<T>, loading = true): Observable<ActionSuccessResponse<T>> {
        let url = this.getURL()
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.post<ActionSuccessResponse<T>>(url, body, options)
    }

    update(id: string, body: Partial<T>, loading = true): Observable<ActionSuccessResponse<T>> {
        let url = this.getURL(id)
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.put<ActionSuccessResponse<T>>(url, body, options)
    }

    delete(id?: string, loading = true): Observable<ActionSuccessResponse<T>> {
        let url = this.getURL(id)
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.delete<ActionSuccessResponse<T>>(url, options)
    }
}
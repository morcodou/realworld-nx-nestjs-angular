import { HttpClient } from '@angular/common/http'
import { ActionSuccessResponse, ListSuccessResponse } from '@realworld/shared/client-server'
import { IConfigurationService } from '@realworld/shared/configuration'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IPage, IPageRequest, IQuery } from '../paging/paging-types'
import { BaseService } from "./base.service"
import { IBaseDataComplexService } from './i-base-data-complex.service'
import { IEndpoint } from './i-endpoint'

export abstract class BaseDataComplexService<T> extends BaseService implements IBaseDataComplexService<T> {
    constructor(
        configuration: IConfigurationService,
        protected http: HttpClient
    ) {
        super(configuration)
    }
    
    getOneFromEndpoint(endpoint: IEndpoint, loading = true): Observable<T> {
        let url = this.getURLFromEndpoint(endpoint)
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.get<T>(url, options)
    }

    getAllFromEndpoint(req: IPageRequest<T>, query: IQuery, endpoint: IEndpoint, loading = true): Observable<IPage<T>> {
        let url = this.getURLFromEndpoint(endpoint)
        this.setLoading(loading ? 'show' : 'not-show')
        let options = this.getAllOptions(req, query)
        return this.http.get<ListSuccessResponse<T>>(url, options).pipe(map(
            res => this.mapGetAllRes<T>(res, req.pageIndex, req.limit)
        ))
    }
    
    createFromEndpoint(body: Partial<T>, endpoint: IEndpoint, loading = true): Observable<ActionSuccessResponse<T>> {
        let url = this.getURLFromEndpoint(endpoint)
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.post<ActionSuccessResponse<T>>(url, body, options)
    }

    updateFromEndpoint(body: Partial<T> & {id: string}, endpoint?: IEndpoint, loading = true): Observable<ActionSuccessResponse<T>> {
        let url = this.getURLFromEndpoint(endpoint)
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.put<ActionSuccessResponse<T>>(url, body, options)
    }

    deleteFromEndpoint(endpoint: IEndpoint, loading = true): Observable<ActionSuccessResponse<T>> {
        let url = this.getURLFromEndpoint(endpoint)
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.delete<ActionSuccessResponse<T>>(url, options)
    }
}
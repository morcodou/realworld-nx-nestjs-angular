import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http'
import { HTTP_HEADER, ListSuccessResponse } from '@realworld/shared/client-server'
import { IConfiguration, IConfigurationService } from '@realworld/shared/configuration'
import { IPage, IPageRequest, IQuery } from '../paging/paging-types'
import { IEndpoint } from './i-endpoint'

/**
 * This class is intended to be a base class for all http service classes.
 * Handle: headers, configs, options, urls, endpoints
 */
export abstract class BaseService {
    private _restURL: string
    private headers: HttpHeaders

    private get restURL(): string {
        if (!this._restURL) {
            throw Error('REST URL is not set, please check the configurations')
        }

        return this._restURL
    }
    private set restURL(url: string) {
        this._restURL = url
    }

    /**
     * Provide default options to make a http request
     */
    protected get defaultOptions() {
        return {
            headers: this.headers || {},
            observe: 'body' as const,
            responseType: 'json' as const,
        }
    }

    /**
     * This is to provide a default endpoint for each concrete service.
     * Usecase
     * For example the Booking service that have endpoints for:
     * - Get all, create: /booking
     * - Get one, update, delete: /booking/:bookingId
     *
     * If you have more complex enpoints, for example the Facility Slot service that have endpoints for:
     * - Get all, create: /facility/:facilityId/slot
     * - Get one, update, delete: /facility/:facilityId/slot/:slotId
     * In this case, when implement endpoint in the concrete service, just throw an error because in this situation we will use the custome endpoint provided instead.
     */
    protected abstract get endpoint(): string

    constructor(private configSerivce: Partial<IConfigurationService>) {
        this.setDefaultHeaders()
        this.configSerivce.configs$.subscribe(configs => {
            this.handleConfigs(configs)
        })
    }

    /**
     * Add new headers for a request
     * @param headers {[name: string]: string | string[]}
     */
    protected setHeaders(headers: {[name: string]: string | string[]}) {
        if (!this.headers) {
            throw new Error("BaseService: property headers was used but its value was not set")
        }
        Object.keys(headers).forEach(
            name => this.headers = this.headers.set(name, headers[name])
        )
    }

    /**
     * Delete a header from a request
     * @param header string
     */
    protected deleteHeaders(header: string) {
        if (!this.headers) {
            throw new Error("BaseService: property headers was used but its value was not set")
        }
        this.headers = this.headers.delete(header)
    }

    /**
     * Empty the headers objects.
     * Usecase
     * Used to clear all previous headers or to create a new header with your own values
     */
    protected emptyHeadersObject() {
        this.headers = new HttpHeaders()
    }

    /**
     * Control whether show or not show the spinner on a specific request
     * @param loading 'show' | 'not-show'
     */
    protected setLoading(loading: 'show' | 'not-show') {
        this.setHeaders({loading: loading})
    }

    /**
     * Get a url for making a specific request
     * @param id string
     */
    protected getURL(id?: string): string {
        if (id) {
            return this.restURL + '/' + this.endpoint + '/' + id
        }

        return this.restURL + '/' + this.endpoint
    }
    /**
     * Get a url from a custom enpoint provided for making a specific request
     * @param endpoint Endpoint
     */
    protected getURLFromEndpoint(endpoint: IEndpoint): string {
        if (endpoint.endpoint && !endpoint.bindings) {
            return this.restURL + '/' + endpoint.endpoint
        }

        let variableIndexes: number[] = []
        let parsedElements = endpoint.endpoint.split('/')
        parsedElements.forEach((e, index) =>{
            if (e.startsWith(':')) {
                variableIndexes.push(index)
            }
        })

        if (variableIndexes.length !== endpoint.bindings.length) {
            throw new Error("BaseService > getURLFromEndpoint: the number of binding elements is not equal to the number of variables")
        }

        variableIndexes.forEach(variableIndex => parsedElements[variableIndex] = endpoint.bindings[variableIndex])

        return parsedElements.join('/')
    }

    /**
     * Create options for getAll and getAllFromEndpoint methods
     * @param req IPageRequest<T>
     * @param query IQuery
     */
    protected getAllOptions<T>(req: IPageRequest<T>, query: IQuery) {
        let params = {
            // assign a param equal [] to remove this param from the query
            offset: (req?.pageIndex === null || req?.pageIndex === undefined) ? [] : (req?.limit ? req?.pageIndex*req?.limit : req?.pageIndex).toString(),
            limit: (req?.limit === null || req?.limit === undefined) ? [] : req?.limit.toString(),
            orderBy: (req?.order === null || req?.order === undefined) ? [] : req?.order?.orderBy.toString(),
            orderType: (req?.order === null || req?.order === undefined) ? [] : req?.order?.orderType.toString(),
            ...query
        }
        let options = {
            params: new HttpParams({fromObject: params}),
            ...this.defaultOptions,
            observe: 'response' as const
        }

        return options
    }

    protected mapGetAllRes<T>(res: HttpResponse<ListSuccessResponse<T>>, pageIndex: number, limit: number): IPage<T> {
        let data: IPage<T> = {
            limit: limit,
            total: res?.body?.total,
            pageIndex: pageIndex,
            data: res?.body?.listData as T[]
        }
        return data
    }

    private handleConfigs(configs: Partial<IConfiguration>) {
        this.restURL = configs.rest.url
    }

    private setDefaultHeaders() {
        this.emptyHeadersObject()
        let headers: {[key: string]: string} = {}
        headers[HTTP_HEADER.CONTENT_TYPE] = 'application/json'
        this.setHeaders(headers)
        this.setLoading("show")
    }
}

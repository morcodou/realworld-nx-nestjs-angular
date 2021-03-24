import { ActionSuccessResponse } from '@realworld/shared/client-server';
import { Observable } from 'rxjs';
import { IPage, IPageRequest, IQuery } from '../paging/paging-types';
import { IEndpoint } from './i-endpoint';

/**
 * This class is intended to be a base class for all data services that have complex endpoints. For example the Facility Slot service that have endpoints for:
 * - Get all, create: /facility/:facilityId/slot
 * - Get one, update, delete: /facility/:facilityId/slot/:slotId
 * Provides all CRUD actions.
 * If you have a more complex action, you need to implement this action on the concrete class yourself.
 */
export abstract class IBaseDataComplexService<T>  {

    /**
     * Get a data object from a custom endpoint provided
     * @param endpoint IEndpoint
     */
    abstract getOneFromEndpoint(endpoint: IEndpoint, loading?:boolean): Observable<T>

    abstract getAllFromEndpoint(req: IPageRequest<T>, query: IQuery, endpoint: IEndpoint, loading?:boolean): Observable<IPage<T>>

    /**
     * Create a data object from a custom endpoint provided
     * @param body Partial<T>
     * @param endpoint IEndpoint
     */
    abstract createFromEndpoint(body: Partial<T>, endpoint: IEndpoint, loading?:boolean): Observable<ActionSuccessResponse<T>>

    /**
     * Update a data object from a custom endpoint provided
     * @param body Partial<T>
     * @param endpoint IEndpoint
     */
    abstract updateFromEndpoint(body: Partial<T>, endpoint?: IEndpoint, loading?:boolean): Observable<ActionSuccessResponse<T>>

    /**
     * Delete a data object from a custom endpoint provided
     * @param endpoint IEndpoint
     */
    abstract deleteFromEndpoint(endpoint: IEndpoint, loading?:boolean): Observable<ActionSuccessResponse<T>>
}
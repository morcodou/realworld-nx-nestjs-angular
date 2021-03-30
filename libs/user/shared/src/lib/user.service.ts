import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActionSuccessResponse, DetailSuccessResponse } from "@realworld/shared/client-server";
import { IConfigurationService } from "@realworld/shared/configuration";
import { BaseDataService } from "@realworld/shared/foundation";
import { UserStorageUtil } from "@realworld/shared/storage";
import { ILoginUser, INewUser, IUser } from "@realworld/user/api-interfaces";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IUserService } from "./i-user.service";

@Injectable()
export class UserService extends BaseDataService<IUser> implements IUserService {
    protected get endpoint(): string {
        return 'users'
    }

    isAuth: boolean
    userInfo: IUser | null

    constructor(
        config: IConfigurationService,
        protected http: HttpClient,
        private userStorageUtil: UserStorageUtil
    ) {
        super(config, http)
        this.updateAuthState(this.userStorageUtil.userInfo as IUser)
    }

    logout() {
        this.userStorageUtil.clearUserData()
        this.updateAuthState(null)
    }

    updateAuthState(user: IUser | null) {
        this.userInfo = user
        this.isAuth = !!user
    }

    login(body: ILoginUser, loading = true): Observable<ActionSuccessResponse<IUser>> {
        let url = this.getURLFromEndpoint({ endpoint: 'users/login' })
        this.setLoading(loading ? 'show' : 'not-show')
        let options = { ...this.defaultOptions }
        return this.http.post<ActionSuccessResponse<IUser>>(url, body, options)
            .pipe(tap(res => {
                this.updateAuthState(res.data as IUser)
                this.userStorageUtil.setUserData(res)
            }))
    }

    register(data: INewUser, loading = true): Observable<ActionSuccessResponse<IUser>> {
        let url = this.getURLFromEndpoint({ endpoint: 'users' })
        this.setLoading(loading ? 'show' : 'not-show')
        return this.http.post<ActionSuccessResponse<IUser>>(url, data, this.defaultOptions)
            .pipe(tap(res => {
                this.updateAuthState(res.data as IUser)
                this.userStorageUtil.setUserData(res)
            }))
    }

    update(id: string, body: Partial<IUser> & {id: string}, loading = true): Observable<ActionSuccessResponse<IUser>> {
        let url = this.getURL()
        this.setLoading(loading ? 'show' : 'not-show')
        let options = {...this.defaultOptions}
        return this.http.put<ActionSuccessResponse<IUser>>(url, body, options)
            .pipe(tap(res => {
                this.updateAuthState(res.data as IUser)
                this.userStorageUtil.setUserData(res)
            }))
    }

    getCurrentUser(loading = true): Observable<DetailSuccessResponse<Partial<IUser>>> {
        let url = this.getURLFromEndpoint({ endpoint: 'user' })
        this.setLoading(loading ? 'show' : 'not-show')
        return this.http.get<DetailSuccessResponse<Partial<IUser>>>(url, this.defaultOptions)
    }

}
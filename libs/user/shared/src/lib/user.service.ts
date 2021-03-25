import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActionSuccessResponse } from "@realworld/shared/client-server";
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

    login(body: ILoginUser): Observable<ActionSuccessResponse<IUser>> {
        let url = this.getURLFromEndpoint({ endpoint: 'users/login' })
        let options = { ...this.defaultOptions }
        return this.http.post<ActionSuccessResponse<IUser>>(url, body, options)
            .pipe(tap(res => {
                this.updateAuthState(res.data as IUser)
                this.userStorageUtil.setUserData(res)
            }))
    }

    register(data: INewUser): Observable<ActionSuccessResponse<IUser>> {
        let url = this.getURLFromEndpoint({ endpoint: 'users' })
        return this.http.post<ActionSuccessResponse<IUser>>(url, data, this.defaultOptions)
            .pipe(tap(res => {
                this.updateAuthState(res.data as IUser)
                this.userStorageUtil.setUserData(res)
            }))
    }

}
import { Inject, Injectable } from "@angular/core";
import { STORAGE_KEY } from "./constants";
import { IUser, IUserData } from "./interfaces";
import { StorageUtil } from "./storage.util";
import { LOCAL_STORAGE } from "@ng-web-apis/common"; 

@Injectable({
    providedIn: 'root'
})
export class UserStorageUtil extends StorageUtil {
    private userCache: IUser

    constructor(@Inject(LOCAL_STORAGE) readonly sessionStorage: Storage) {
        super(sessionStorage)
    }

    setUserData(res: IUserData) {
        this.setUserInfo(res.data)
    }

    get userInfo(): IUser | null {
        if (this.userCache) {
            return this.userCache
        }
        const data = this.getItem(STORAGE_KEY.USER_INFO)
        this.userCache = JSON.parse(data)
        return this.userCache
    }

    get token(): string | null {
        let userInfo = this.userInfo
        return userInfo ? userInfo.token : null
    }

    clearUserData() {
        this.userCache = null
        this.removeItem(STORAGE_KEY.USER_INFO)
    }

    private setUserInfo(user: IUser) {
        this.userCache = user
        const data = JSON.stringify(user)
        this.setItem(STORAGE_KEY.USER_INFO, data)
    }
}

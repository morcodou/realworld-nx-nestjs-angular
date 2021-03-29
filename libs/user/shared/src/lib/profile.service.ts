import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActionSuccessResponse, DetailSuccessResponse } from "@realworld/shared/client-server";
import { IConfigurationService } from "@realworld/shared/configuration";
import { BaseDataService } from "@realworld/shared/foundation";
import { IProfile, IUser } from "@realworld/user/api-interfaces";
import { Observable } from "rxjs";
import { IProfileService } from "./i-profile.service";

@Injectable()
export class ProfileService extends BaseDataService<IUser> implements IProfileService {
    protected get endpoint(): string {
        return 'profiles'
    }

    constructor(
        config: IConfigurationService,
        protected http: HttpClient
    ) {
        super(config, http)
    }

    getProfile(username: string, loading = true): Observable<DetailSuccessResponse<IProfile>> {
        let url = this.getURL(username)
        this.setLoading(loading ? 'show' : 'not-show')
        return this.http.get<DetailSuccessResponse<Partial<IProfile>>>(url, this.defaultOptions)
    }

    followAUser(username: string, loading = true): Observable<ActionSuccessResponse<IProfile>> {
        let url = this.getURLFromEndpoint({ endpoint: `profiles/${username}/follow` })
        this.setLoading(loading ? 'show' : 'not-show')
        let options = { ...this.defaultOptions }
        return this.http.post<ActionSuccessResponse<IUser>>(url, null, options)
    }

    unfollowAUser(username: string, loading = true): Observable<ActionSuccessResponse<IProfile>> {
        let url = this.getURLFromEndpoint({ endpoint: `profiles/${username}/follow` })
        this.setLoading(loading ? 'show' : 'not-show')
        let options = { ...this.defaultOptions }
        return this.http.delete<ActionSuccessResponse<IUser>>(url, options)
    }

}
import { Injectable } from "@angular/core";
import { ActionSuccessResponse, DetailSuccessResponse } from "@realworld/shared/client-server";
import { IBaseDataService } from "@realworld/shared/foundation";
import { IProfile, IUser } from "@realworld/user/api-interfaces";
import { Observable } from "rxjs";
import { ProfileService } from "./profile.service";

@Injectable({
    providedIn: 'root',
    useClass: ProfileService
})
export abstract class IProfileService extends IBaseDataService<IUser> {
    abstract getProfile(username: string, loading?:boolean): Observable<DetailSuccessResponse<IProfile>>
    abstract followAUser(username: string, loading?:boolean): Observable<ActionSuccessResponse<IProfile>>
    abstract unfollowAUser(username: string, loading?:boolean): Observable<ActionSuccessResponse<IProfile>>
}
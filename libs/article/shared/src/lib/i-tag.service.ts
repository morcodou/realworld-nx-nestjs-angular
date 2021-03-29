import { Injectable } from "@angular/core";
import { IBaseDataService } from "@realworld/shared/foundation";
import { TagService } from "./tag.service";

@Injectable({
    providedIn: 'root',
    useClass: TagService
})
export abstract class ITagService extends IBaseDataService<string> {
}
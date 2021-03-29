import { Injectable } from "@angular/core";
import { BaseDataService } from "@realworld/shared/foundation";
import { ITagService } from "./i-tag.service";

@Injectable()
export class TagService extends BaseDataService<string> implements ITagService {
    protected get endpoint(): string {
        return 'tags'
    }
}
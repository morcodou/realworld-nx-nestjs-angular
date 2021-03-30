import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IConfigurationService } from "@realworld/shared/configuration";
import { BaseDataService } from "@realworld/shared/foundation";
import { ITagService } from "./i-tag.service";

@Injectable()
export class TagService extends BaseDataService<string> implements ITagService {
    protected get endpoint(): string {
        return 'tags'
    }

    constructor(
        config: IConfigurationService,
        protected http: HttpClient
    ) {
        super(config, http)
    }
}
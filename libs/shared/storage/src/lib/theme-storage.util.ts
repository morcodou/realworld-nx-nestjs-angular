import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE } from "@ng-web-apis/common";
import { STORAGE_KEY } from "./constants";
import { StorageUtil } from "./storage.util";

@Injectable({
    providedIn: 'root'
})
export class ThemeStorageUtil extends StorageUtil {
    constructor(@Inject(LOCAL_STORAGE) readonly localStorage: Storage) {
        super(localStorage)
    }

    get theme(): string {
        return this.getItem(STORAGE_KEY.THEME)
    }
    setTheme(theme: string) {
        this.setItem(STORAGE_KEY.THEME, theme)
    }
    clearTheme() {
        this.removeItem(STORAGE_KEY.THEME)
    }
}

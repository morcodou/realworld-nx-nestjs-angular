import { Injectable, Optional } from '@angular/core';
import { IConfigurationService } from '@realworld/shared/configuration';
import { UserStorageUtil } from '@realworld/shared/storage';
import { ILoggingService } from '../i-logging.service';
import { LogWriter } from './log-writer';


/**
 * Use this writer to log information to the browser console.
 */
@Injectable({
    providedIn: 'root'
})
export class ConsoleWriter extends LogWriter {
    constructor(
        loggingService: ILoggingService,
        @Optional() configuration: IConfigurationService,
        userStorageUtil: UserStorageUtil
    ) {
        super(loggingService, configuration, userStorageUtil)
        // console.info('Init ConsoleWriter')
    }

    /**
     * Implementation of the abstract method. This will perform the
     * actual `write` action for the specified writer.
     */
    public write(): void {
        if (!this.configs.sendToConsole) {
            return
        }
        
        switch (this.targetEntry.level) {
            case 'info':
                console.info(this.targetEntry)
                break
            case 'warn':
                console.warn(this.targetEntry)
                break
            case 'error':
                console.error(this.targetEntry)
                break
            case 'debug':
                if(this.debug) {
                    console.info(this.targetEntry)
                }
                break
            default:
                break
        }
    }
}

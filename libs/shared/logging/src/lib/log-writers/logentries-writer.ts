import { Injectable, Optional } from '@angular/core';
import { IConfigurationService } from '@realworld/shared/configuration';
import * as Logger from 'r7insight_js';
import { ILoggingFullData } from '../i-logging-data';
import { ILoggingService } from '../i-logging.service';
import { LogWriter } from './log-writer';
import { UserStorageUtil } from '@realworld/shared/storage';


/**
 * Use this writer to log information to the logentries server.
 */
@Injectable({
    providedIn: 'root'
})
export class LogentriesWriter extends LogWriter {
    constructor(
        loggingService: ILoggingService,
        @Optional() configuration: IConfigurationService,
        userStorageUtil: UserStorageUtil
    ) {
        super(loggingService, configuration, userStorageUtil)

        // console.info('Init LogentriesWriter')
        if (configuration) {
            configuration.configs$.subscribe(configs => {
                this.initLogentries()
            })
        }
    }
    
    /**
     * Implementation of the abstract method. This will perform the
     * actual `write` action for the specified writer.
     */
    public write() {
        if(!this.configs.sendToCentralizedServer || !this.configs.logentriesToken) {
            return
        }

        switch (this.targetEntry.level) {
            case 'info':
                Logger.info(this.formatEntry(this.targetEntry), this.targetEntry)
                break
            case 'warn':
                Logger.warn(this.formatEntry(this.targetEntry), this.targetEntry)
                break
            case 'error':
                Logger.error(this.formatEntry(this.targetEntry), this.targetEntry)
                break
            case 'debug':
                if(this.debug) {
                    Logger.info(this.formatEntry(this.targetEntry), this.targetEntry)
                }
                break
            default:
                break
        }
    }

    /**
     * Use this function to format a specified [Log Entry] item. This should be moved
     * to a specific [formatter] service that can be injected into the specified
     * writer.
     * @param logEntry
     */
    private formatEntry(logEntry: ILoggingFullData): string {
        return `
            timestamp: ${new Date(logEntry.timestamp).toISOString()}; 
            application: ${logEntry.application}; 
            level: ${logEntry.level}; 
            message: ${logEntry.message}; 
            action: ${logEntry.action}; 
            userId: ${logEntry.userId}; 
            errorCode: ${logEntry.errorCode}; 
            errorName: ${logEntry.errorName}; 
        `
    }

    private initLogentries() {
        if (this.configs.sendToCentralizedServer && this.configs.logentriesToken) {
            Logger.init({ 
                token: this.configs.logentriesToken, 
                region: 'eu'
            })
        }
    }
}

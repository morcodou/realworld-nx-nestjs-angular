import { Injectable, Optional } from '@angular/core';
import { IConfigurationService } from '@realworld/shared/configuration';
import { ILoggingFullData } from '../i-logging-data';
import { ILoggingService } from '../i-logging.service';
// import { LogglyService } from 'ngx-loggly-logger'; // todo: uncomment this line in production
import { LogWriter } from './log-writer';
import { UserStorageUtil } from '@realworld/shared/storage';

/**
 * Use this writer to log information to the logentries server.
 */
@Injectable({
    providedIn: 'root'
})
export class LogglyWriter extends LogWriter {
    private loggly: any // todo: remove this line in production

    constructor(
        private loggingService: ILoggingService,
        // private loggly: LogglyService, // todo: uncomment this line in production
        @Optional() configuration: IConfigurationService,
        userStorageUtil: UserStorageUtil
    ) {
        super(loggingService, configuration, userStorageUtil)
        // console.info('Init LogentriesWriter')
    }

    preWritting() {
        if(!this.configs.sendToCentralizedServer || !this.configs.logglyToken) {
            return
        }
        try {
            this.loggly.push({
                logglyKey: this.configs.logglyToken,
                sendConsoleErrors: this.configs.sendToConsole,
            });

            if (this.targetEntry.tags && this.targetEntry.tags.length > 0) {
                const tags = this.targetEntry.tags.join(',');
                this.loggly.push({ tag: tags });
            }
        } catch (error) {
            const message = `${this.targetEntry.application}.LogglyWriter: ${{ ...error }}`;
            console.error(message);
        }
    }

    /**
     * Implementation of the abstract method. This will perform the
     * actual `write` action for the specified writer.
     */
    write(): void {
        if(!this.configs.sendToCentralizedServer || !this.configs.logglyToken) {
            return
        }

        let log = this.formatEntry(this.targetEntry)
        if (this.targetEntry.level === 'debug') {
            if (this.debug) {
                this.loggly.push(log)
            }
        } else {
            this.loggly.push(log);
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
            stack: ${logEntry.stack}; 
        `
    }
}

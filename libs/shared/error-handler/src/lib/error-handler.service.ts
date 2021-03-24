import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ILoggingService, ILoggingData } from '@realworld/shared/logging';
import { INotificationService } from '@realworld/shared/notification';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
    constructor(
        private loggingService: ILoggingService,
        private notificationService: INotificationService,
        @Inject(PLATFORM_ID) private platformId: string
    ) {}

    handleError(error) {
        console.info('Handling error with ErrorHandlingService')

        // Extract error wrapped by zone.js from promise rejection 
        if (error.promise && error.rejection) { 
            error = error.rejection;
        }

        if (isPlatformServer(this.platformId)) {
            return this.handleErrorFunc({
                message: error?.message || 'unexpected error',
                errorName: error?.name || 'Error',
                stack: error?.stack,
            }, error?.message || 'Unexpected error.')
        }


        // http errors
        if (error instanceof HttpErrorResponse) {
            // client side errors
            if (error.error instanceof ProgressEvent) { 
                this.handleErrorFunc({
                    message: 'Client side error: ' + error.message,
                    errorName: error.name,
                    action: `Making request to url ${error.url}`
                }, 'Cannot connect to server, please try again later.')
            } else { // server side errors
                this.handleErrorFunc({
                    message: 'Server side error: ' + error?.error?.message || error.message,
                    errorName: error.name,
                    errorCode: error?.error?.code,
                    action: `Making request to url ${error.url}`
                }, error?.error?.message || error.message)
            }
        } else {
            this.handleErrorFunc({
                message: error?.message || 'unexpected error',
                errorName: error?.name || 'Error',
                stack: error?.stack,
            }, error?.message || 'Unexpected error.')
        }
    }

    private handleErrorFunc(errorData: ILoggingData, notiMessage: string) {
        this.loggingService.error(errorData)
        this.notificationService.showError(notiMessage)
    }
}
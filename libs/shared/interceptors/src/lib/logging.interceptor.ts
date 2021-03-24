import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoggingService } from '@realworld/shared/logging';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private loggingService: ILoggingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.info('LoggingInterceptor')
    this.loggingService.info({
      message: `making a ${request.method} request to ${request.url}`
    })
    return next.handle(request)
  }
}

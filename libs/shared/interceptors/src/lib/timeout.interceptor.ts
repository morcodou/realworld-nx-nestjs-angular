import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

export const REQUEST_TIMEOUT = 30000

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.info('TimeoutInterceptor')
    
    return next.handle(request).pipe(timeout(REQUEST_TIMEOUT))
  }
}

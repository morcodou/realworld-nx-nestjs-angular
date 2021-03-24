import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP_METHOD } from '@realworld/shared/client-server';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // handling http errors
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.info('ErrorInterceptor')
    return next.handle(request).pipe(
      // retry when an error happens with GET request
      retry(request.method === HTTP_METHOD.GET ? 3 : 0),
    )
  }
}

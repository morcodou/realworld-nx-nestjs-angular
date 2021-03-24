import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_HEADER } from '@realworld/shared/client-server';
import { UserStorageUtil } from '@realworld/shared/storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userStorageUtil: UserStorageUtil) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.info('TokenInterceptor')
    
    let token = this.userStorageUtil.token
    if (token) {
      let newHeaders = request.headers;
      // If we have a token, we append it to our new headers
      newHeaders = newHeaders.append(HTTP_HEADER.AUTHORIZATION, 'Bearer ' + token);

      // Finally we have to clone our request with our new headers
      // This is required because HttpRequests are immutable
      const authReq = request.clone({ headers: newHeaders });
      // Then we return an Observable that will run the request
      // or pass it to the next interceptor if any
      return next.handle(authReq);
    }
    
    return next.handle(request)
  }
}

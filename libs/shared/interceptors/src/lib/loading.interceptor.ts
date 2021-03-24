import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoadingService } from '@realworld/shared/loading';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: ILoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.info('LoadingInterceptor')
    const loadingHeader = 'loading'
    if (
      request.headers.has(loadingHeader) && 
      request.headers.get(loadingHeader) === 'show'
    ) {
      request = request.clone(
        // remove loading header from headers object
        {headers: request.headers.delete(loadingHeader)}
      )

      this.loadingService.loading()

      return next.handle(request).pipe(
        finalize(() => {
          this.loadingService.loaded()
        })
      )
    }
    return next.handle(request)
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP_METHOD } from '@realworld/shared/client-server';
import { INotificationService, NotificationType } from '@realworld/shared/notification';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private notificationService: INotificationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.info('NotificationInterceptor')
    
    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          this.notify(request, event)
        }
      })
    )
  }

  private notify(
    req: HttpRequest<unknown>, 
    res: HttpResponse<unknown>
  ) {
    let noti = this.getNotification(req, res)
    if (!noti || !noti.message) {
      return 
    }

    switch (noti.type) {
      case NotificationType.sussess:
        this.notificationService.showSuccess(noti.message)
        break
      case NotificationType.info:
        this.notificationService.showInfo(noti.message)
        break
      case NotificationType.warning:
        this.notificationService.showWarning(noti.message)
        break
      case NotificationType.error:
        this.notificationService.showError(noti.message)
        break
    }
  }

  private getNotification(
    req: HttpRequest<unknown>, 
    res: HttpResponse<any>
  ): {type: NotificationType, message: string} | null {
    // errors will be handled in error intercepter
    if (res.ok) { 
      switch (req.method) {
        case HTTP_METHOD.DELETE:
          return {
            type: NotificationType.sussess,
            message: res?.body?.message 
          }
        case HTTP_METHOD.POST:
          return {
            type: NotificationType.sussess,
            message: res?.body?.message  
          }
        case HTTP_METHOD.PUT:
        case HTTP_METHOD.PATCH:
          return {
            type: NotificationType.sussess,
            message: res?.body?.message 
          }
        default: 
          return null
      }
    }
  }
}

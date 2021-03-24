import { Injectable } from '@angular/core';
import { INotification, NotificationType } from './i-notification';
import { Subject } from 'rxjs';
import { INotificationService } from './i-notification.service';

@Injectable()
export class NotificationService implements INotificationService {
  private notification = new Subject<INotification>()
  readonly notification$ = this.notification.asObservable()

  constructor(){

  }
  showError(m: string, translate = true) {
    this.notification.next({ type: NotificationType.error, message: m })
  }

  showSuccess(m: string, translate = true) {
    this.notification.next({ type: NotificationType.sussess, message: m })
  }

  showInfo(m: string, translate = true) {
    this.notification.next({ type: NotificationType.info, message: m })
  }

  showWarning(m: string, translate = true) {
    this.notification.next({ type: NotificationType.warning, message: m })
  }
}

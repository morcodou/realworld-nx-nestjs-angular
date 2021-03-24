import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastContainerComponent} from './toast-container/toast-container.component';
import {ToastContainerService} from "./toast-container.service";
import {Toaster} from "./toaster";
import {TOAST_NOTIFICATIONS_CONFIG, ToastNotificationsConfig} from "./toast-config/toast-notifications.config";

export function InitToastFactory(toast: Toaster) {
  return () => {
    return toast;
  };
}

@NgModule({
  declarations: [ToastContainerComponent],
  entryComponents: [ToastContainerComponent],
  imports: [
    CommonModule
  ],
  providers: [
    ToastContainerService,
    {
      provide: APP_INITIALIZER,
      useFactory: InitToastFactory,
      deps: [Toaster],
      multi: true
    }
  ]
})
export class SharedToasterModule {
  static initializeConfig(config: ToastNotificationsConfig): ModuleWithProviders<SharedToasterModule> {
    return {
      ngModule: SharedToasterModule,
      providers: [{
        provide: TOAST_NOTIFICATIONS_CONFIG, useValue: config
      }]
    }
  }
}

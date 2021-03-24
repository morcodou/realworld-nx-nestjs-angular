import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfiguration, SharedConfigurationModule } from '@realworld/shared/configuration';
import { SharedErrorHandlerModule } from '@realworld/shared/error-handler';
import { SharedInterceptorsModule } from '@realworld/shared/interceptors';
import { SharedLoggingModule } from '@realworld/shared/logging';
import { SharedSpinnerModule } from '@realworld/shared/spinner';
import { SharedToasterModule, ToastNotificationsConfig } from '@realworld/shared/toaster';


const config: ToastNotificationsConfig = {
  duration: 5000
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedSpinnerModule,
    SharedErrorHandlerModule,
    SharedLoggingModule,
    SharedInterceptorsModule,
    SharedToasterModule.initializeConfig(config),
  ],
  providers: [
    DatePipe,
    CurrencyPipe, 
    DecimalPipe,
  ]
})
export class SharedCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedCoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only.`);
    }
  }

  static forRoot(configs: Partial<IConfiguration>): ModuleWithProviders<SharedCoreModule> {
    return {
      ngModule: SharedCoreModule,
      providers: [
        ...SharedConfigurationModule.forRoot(configs).providers
      ]
    }
  }
}

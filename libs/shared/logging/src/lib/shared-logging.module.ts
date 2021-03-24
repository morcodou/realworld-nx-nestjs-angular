import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ILoggingService } from './i-logging.service';
import { InitLoggingAndWriters } from './init-logging-and-writers.factory';
import { ConsoleWriter } from './log-writers/console-writer';
import { LogentriesWriter } from './log-writers/logentries-writer';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [ILoggingService, ConsoleWriter, LogentriesWriter],
      multi: true,
      useFactory: InitLoggingAndWriters
    },
  ]
})
export class SharedLoggingModule { }

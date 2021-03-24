import { ILoggingService } from './i-logging.service';
import { ConsoleWriter } from './log-writers/console-writer';
import { LogentriesWriter } from './log-writers/logentries-writer';

export function InitLoggingAndWriters(
  loggingService: ILoggingService, 
  consoleWriter: ConsoleWriter, 
  logentriesWriter: LogentriesWriter
) {
  // console.info("InitLoggingAndWriters")
  return () => {
    return consoleWriter;
  };
}
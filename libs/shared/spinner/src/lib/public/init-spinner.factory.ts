import { ISpinnerService } from './i-spinner.service';

export function InitSpinnerFactory(spinner: ISpinnerService) {
  // console.info("InitSpinner")
  return () => {
    return spinner;
  };
}
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';

import { ILoadingService } from '@realworld/shared/loading';
import { ISpinnerService } from '../public/i-spinner.service';
import { NbSpinnerComponent } from './nb-spinner.component';

@Injectable()
export class NbSpinnerService implements ISpinnerService {
  private overlayRef: OverlayRef
  private componentRef: ComponentRef<NbSpinnerComponent>
  private spinnerOverlayPortal = new ComponentPortal(NbSpinnerComponent)

  constructor(
    private loadingService: ILoadingService,
    private overlay: Overlay
  ) { 
    // console.info('Init MaterialSpinnerService')
    this.loadingService.loader$.subscribe(isShow => isShow ? this.show() : this.hide())
  }

  show() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      return
    }
    this.overlayRef = this.overlay.create()
    this.componentRef = this.overlayRef.attach(this.spinnerOverlayPortal)
  } 

  hide() {
    if (!this.overlayRef) {
      return
    }
    if (!this.componentRef) {
      throw Error('SpinnerService: componentRef is not initialized properly')
    }

    this.componentRef.destroy()
    this.overlayRef.detach()
  }
}

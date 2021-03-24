import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { ILoadingService } from './i-loading.service'

@Injectable()
export class LoadingService implements ILoadingService {
  private loader = new Subject<boolean>()
  private countLoading = 0

  readonly loader$ = this.loader.asObservable()

  loading() {
    // console.info("loading")
    this.countLoading++
    this.loader.next(!!this.countLoading)
  }

  loaded() {
    // console.info("loaded")
    this.countLoading--
    this.loader.next(!!this.countLoading)
  }
}

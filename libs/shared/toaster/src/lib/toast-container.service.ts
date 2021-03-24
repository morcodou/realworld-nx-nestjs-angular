import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef, EmbeddedViewRef,
  Inject,
  Injectable, Injector,
  OnDestroy,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import {ToastContainerComponent} from "./toast-container/toast-container.component";
import { WINDOW } from "@ng-web-apis/common"; 

const TOAST_CONTAINER_CLASS_NAME = 'toast-container';

@Injectable({
  providedIn: 'root'
})
export class ToastContainerService implements OnDestroy {
  private renderer: Renderer2;
  private _containerElement: HTMLElement;
  private componentRef: ComponentRef<ToastContainerComponent>;
  appRef: any;

  constructor(
    rendererFactory: RendererFactory2,
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(WINDOW) private readonly window: Window
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
  }

  get ref(): ComponentRef<ToastContainerComponent> {
    if (!this.appRef) {
      this.appRef = this.injector.get(ApplicationRef);
    }
    if (!this.componentRef) {
      this._attach();
    }
    return this.componentRef;
  }

  private get containerElement(): HTMLElement {
    if (!this._containerElement) {
      this._containerElement = this.renderer.createElement('div');
      this.renderer.addClass(this._containerElement, TOAST_CONTAINER_CLASS_NAME);
      this.renderer.appendChild(this.window.document.getElementsByTagName('body')[0], this._containerElement);
    }
    return this._containerElement;
  }

  ngOnDestroy() {
    // this._detach();
    // this._destroyContainer();
  }

  private _attach() {
    this._detach();
    const componentFactory = this.factoryResolver.resolveComponentFactory(ToastContainerComponent);
    this.componentRef = componentFactory.create(this.injector);
    const hostView = this.componentRef.hostView as EmbeddedViewRef<any>;
    this.appRef.attachView(hostView);
    const rootNode = hostView.rootNodes[0] as HTMLElement;
    this.renderer.appendChild(this.containerElement, rootNode);
  }

  private _detach() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private _destroyContainer() {
    if (this._containerElement && this._containerElement.parentNode) {
      this.renderer.removeChild(this._containerElement.parentNode, this._containerElement);
      this._containerElement = null;
    }
  }
}

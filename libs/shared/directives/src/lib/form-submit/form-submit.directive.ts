import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Directive({
  selector: 'form, [formGroup]'
})
export class FormSubmitDirective {
  submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1))

  constructor(private host: ElementRef<HTMLFormElement>) { }
 
  get element() {
    return this.host.nativeElement;
  }
}

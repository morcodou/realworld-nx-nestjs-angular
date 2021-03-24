import { ComponentFactoryResolver, ComponentRef, Directive, Host, Inject, Optional, Self, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormSubmitDirective } from '../form-submit/form-submit.directive';
import { ControlErrorComponent } from './control-error.component';
import { FORM_ERRORS } from './errors';

@UntilDestroy()
@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective {
  submit$: Observable<Event>;
  ref: ComponentRef<ControlErrorComponent>;

  constructor(
    @Self() private control: NgControl,
    @Inject(FORM_ERRORS) private errors,
    @Optional() @Host() private form: FormSubmitDirective,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { 
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    merge(
      this.submit$.pipe(map(_ => true)),
      this.control.valueChanges.pipe(
        map(_ => (this.control.touched || this.control.dirty) ? true : false)
      )
    ).pipe(untilDestroyed(this))
    .subscribe(ok => {
      if (!ok) { return }
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey];
        const text = getError ? getError(controlErrors[firstKey]) : 'Invalid field';
        this.setError(text)
      } else {
        this.setError(null)
      }
    });
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.vcr.createComponent(factory);
    }
 
    this.ref.instance.text = text;
  }

}

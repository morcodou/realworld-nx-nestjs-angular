import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlErrorsDirectiveModule, FormSubmitDirectiveModule } from '@realworld/shared/directives';

@NgModule({
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormSubmitDirectiveModule,
    ControlErrorsDirectiveModule,
    RouterModule
  ]
})
export class SharedCommonModule {}

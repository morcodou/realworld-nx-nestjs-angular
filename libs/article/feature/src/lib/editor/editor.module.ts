import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { EditorComponent } from './editor.component';

@NgModule({
  imports: [
    SharedCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditorComponent
      },
      {
        path: ':slug',
        component: EditorComponent
      },
    ])
  ],
  declarations: [EditorComponent]
})
export class EditorModule {}

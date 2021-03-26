import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SharedCommonModule } from '@realworld/shared/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SettingComponent],
  imports: [
    SharedCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingComponent
      }
    ])
  ]
})
export class SettingModule { }

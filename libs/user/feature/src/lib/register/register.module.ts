import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { AuthContainerComponent } from '../auth-container/auth-container.component';
import { AuthContainerModule } from '../auth-container/auth-container.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    SharedCommonModule,
    AuthContainerModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthContainerComponent,
        children: [
          {
            path: '',
            component: RegisterComponent,
            // canActivate: [NotAuthGuardService]
          },
        ]
      }
    ])
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {}

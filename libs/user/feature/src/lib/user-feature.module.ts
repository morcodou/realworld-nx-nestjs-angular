import { NgModule } from '@angular/core';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '@realworld/shared/common';
import { NotAuthGuardService } from '@realworld/user/shared';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    SharedCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthContainerComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
            // canActivate: [NotAuthGuardService]
          },
          {
            path: 'register',
            component: RegisterComponent,
            // canActivate: [NotAuthGuardService]
          },
        ]
      }
    ])
  ],
  declarations: [
    AuthContainerComponent,
    LoginComponent,
    RegisterComponent,
  ]
})
export class UserFeatureModule {}

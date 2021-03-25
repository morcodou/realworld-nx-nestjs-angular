import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedCommonModule } from '@realworld/shared/common';

@NgModule({
  declarations: [
    LayoutComponent, 
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    LayoutRoutingModule,
    SharedCommonModule
  ]
})
export class LayoutModule {}

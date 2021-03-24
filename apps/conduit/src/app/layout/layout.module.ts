import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    LayoutComponent, 
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    LayoutRoutingModule,
  ]
})
export class LayoutModule {}

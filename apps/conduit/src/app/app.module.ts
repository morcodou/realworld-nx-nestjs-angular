import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedCoreModule } from '@realworld/shared/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    SharedCoreModule.forRoot(environment),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

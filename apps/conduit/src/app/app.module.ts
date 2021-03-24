import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedCoreModule } from '@realworld/shared/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

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

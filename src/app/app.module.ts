import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorInterceptor } from './shared/jwt-interceptor.interceptor';



@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

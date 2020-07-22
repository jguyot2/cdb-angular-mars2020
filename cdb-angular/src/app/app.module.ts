import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComputerDisplayComponent } from './computer-display/computer-display.component';
import { CompanyDisplayComponent } from './company-display/company-display.component';
import { ComputerListDisplayComponent } from './computer-list-display/computer-list-display.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ComputerDisplayComponent,
    CompanyDisplayComponent,
    ComputerListDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

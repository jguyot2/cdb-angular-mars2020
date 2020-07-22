import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComputerDisplayComponent } from './computer-display/computer-display.component';
import { CompanyDisplayComponent } from './company-display/company-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ComputerDisplayComponent,
    CompanyDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

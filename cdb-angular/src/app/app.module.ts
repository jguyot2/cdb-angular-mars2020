import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComputerDisplayComponent } from './computer-display/computer-display.component';
import { CompanyDisplayComponent } from './company-display/company-display.component';
import { ComputerListDisplayComponent } from './computer-list-display/computer-list-display.component';
import { HttpClientModule } from '@angular/common/http';
import { ComputerAddComponent } from './computer-add/computer-add.component';
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    ComputerDisplayComponent,
    CompanyDisplayComponent,
    ComputerListDisplayComponent,
    ComputerAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

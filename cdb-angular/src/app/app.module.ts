import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComputerComponent } from './computer/computer.component';
import { CompanyComponent } from './company/company.component';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ComputerAddComponent } from './computer-add/computer-add.component';
import { FormsModule } from '@angular/forms'
import { HeaderComponent } from './header/header.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './body/body.component'

@NgModule({
  declarations: [
    AppComponent,
    ComputerAddComponent,
    ComputerComponent,
    CompanyComponent,
    ComputerListComponent,
    HeaderComponent,
    BodyComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CustomMaterialModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

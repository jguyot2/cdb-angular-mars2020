import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComputerComponent } from './computer/computer.component';
import { CompanyComponent } from './company/company.component';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ComputerAddComponent } from './computer-add/computer-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderComponent } from './header/header.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { UnderbodyComponent } from './underbody/underbody.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './identification/login/login.component';
import { RegisterComponent } from './identification/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OpenPopup } from './popup';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    ComputerAddComponent,
    ComputerComponent,
    CompanyComponent,
    ComputerListComponent,
    HeaderComponent,
    UnderbodyComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    BodyComponent,
    
  

  ],
 
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [OpenPopup],
  bootstrap: [AppComponent]
})
export class AppModule { }

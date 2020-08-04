import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComputerComponent } from './computer/computer.component';
import { CompanyComponent } from './company/company.component';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ComputerAddComponent } from './computer-add/computer-add.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { UnderbodyComponent } from './underbody/underbody.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OpenPopup } from './popup';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ComputerEditComponent } from './computer-edit/computer-edit.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ComputerDeleteDialogComponent } from './computer-delete-dialog/computer-delete-dialog.component';


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
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    ComputerEditComponent,
    ComputerDeleteDialogComponent,
   
    
    
  

  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],

  providers: [OpenPopup],
// =======
//     NoopAnimationsModule,
//     ReactiveFormsModule,
//     MatDialogModule

//   ],
//   entryComponents: [ComputerListComponent, ComputerEditComponent],
//   providers: [
//     {
//       provide: MatDialogRef,
//       useValue: {}
//     },
//   ],
// >>>>>>> 8a5dcf0ea8fb80a7bfcae2b9f63d7063b7c35d93
  bootstrap: [AppComponent]
})
export class AppModule { }

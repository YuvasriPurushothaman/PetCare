import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { PetsComponent } from './components/pets/pets.component';
import { LoginComponent } from './components/login/login.component';


import { AddfeedbackComponent } from './components/addfeedback/addfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { ViewMyAppointmentComponent } from './components/view-my-appointment/view-my-appointment.component';
import { ViewPetComponent } from './components/view-pet/view-pet.component';
import { ViewTreatmentRecordComponent } from './components/view-treatment-record/view-treatment-record.component';
import { ViewMyFeedbackComponent } from './components/view-my-feedback/view-my-feedback.component';
import { ViewAllAppointmentComponent } from './components/view-all-appointment/view-all-appointment.component';
import { ViewAllFeedbackComponent } from './components/view-all-feedback/view-all-feedback.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { ViewMyTreatmentRecordComponent } from './components/view-my-treatment-record/view-my-treatment-record.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerateCodeComponent } from './components/generate-code/generate-code.component';
import { AuthInterceptorInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PetsComponent,
    AddfeedbackComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    RegistrationComponent,
    AddPetComponent,
    AddAppointmentComponent,
    ViewMyAppointmentComponent,
    ViewPetComponent,
    ViewTreatmentRecordComponent,
    ViewMyFeedbackComponent,
    ViewAllAppointmentComponent,

    ViewAllFeedbackComponent,
    EditAppointmentComponent,
    EditPetComponent,
    ViewMyTreatmentRecordComponent,
    AboutusComponent,
    ContactComponent,
    GenerateCodeComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    {
      provide:
        HTTP_INTERCEPTORS,
      useClass
        :
        AuthInterceptorInterceptor
      , multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

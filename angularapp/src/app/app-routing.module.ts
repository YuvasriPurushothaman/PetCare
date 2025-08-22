import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { AddfeedbackComponent } from './components/addfeedback/addfeedback.component';
import { LoginComponent } from './components/login/login.component';
import { PetsComponent } from './components/pets/pets.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ViewAllAppointmentComponent } from './components/view-all-appointment/view-all-appointment.component';
import { ViewAllFeedbackComponent } from './components/view-all-feedback/view-all-feedback.component';
import { ViewMyAppointmentComponent } from './components/view-my-appointment/view-my-appointment.component';
import { ViewMyFeedbackComponent } from './components/view-my-feedback/view-my-feedback.component';
import { ViewPetComponent } from './components/view-pet/view-pet.component';
import { ViewTreatmentRecordComponent } from './components/view-treatment-record/view-treatment-record.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';

import { AdminGuard } from './guards/admin.guard';
import { OwnerGuard } from './guards/owner.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { ViewMyTreatmentRecordComponent } from './components/view-my-treatment-record/view-my-treatment-record.component';
import { GenerateCodeComponent } from './components/generate-code/generate-code.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'user/appointment/add-appointment',component:AddAppointmentComponent,canActivate:[OwnerGuard]},
  {path:'user/appointment/edit-appointment/:id',component:EditAppointmentComponent,canActivate:[OwnerGuard]},
  {path:'user/pet/add-pet',component:AddPetComponent,canActivate:[OwnerGuard]},
  {path:'user/pet/edit-pet/:id',component:EditPetComponent,canActivate:[OwnerGuard]},
  {path:'user/appointment/add-feedback/:userId/:appointmentId',component:AddfeedbackComponent,canActivate:[OwnerGuard]},
  {path:'login',component:LoginComponent,canActivate:[AuthRedirectGuard]},
  {path:'register',component:RegistrationComponent,canActivate:[AuthRedirectGuard]},
  {path:'hospital/appointment/view-all-appointment',component:ViewAllAppointmentComponent,canActivate:[AdminGuard]},
  {path:'hospital/feedback/view-all-feedback',component:ViewAllFeedbackComponent,canActivate:[AdminGuard]},
  {path:'user/appointment/view-appointment',component:ViewMyAppointmentComponent,canActivate:[OwnerGuard]},
  {path:'user/feedback/view-feedback',component:ViewMyFeedbackComponent,canActivate:[OwnerGuard]},
  {path:'user/pet/get-all',component:PetsComponent,canActivate:[OwnerGuard]},
  {path:'user/pet/single-view/:id',component:ViewPetComponent,canActivate:[OwnerGuard]},
  {path:'hospital-data/view-records',component:ViewTreatmentRecordComponent,canActivate:[AdminGuard]},
  {path:'user-pet-data/view-records',component:ViewMyTreatmentRecordComponent,canActivate:[OwnerGuard]},
  {path:'about-us',component:AboutusComponent},
  {path:'contact-us',component:ContactComponent},
  {path:'error',component:ErrorComponent},
  {path:'admin/generate-code',component:GenerateCodeComponent, canActivate:[AdminGuard]},
  {path:'**',redirectTo:'error',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './features/register/register.component';
import { InputComponent } from './shared/input/input.component';
import { ButtonComponent } from './shared/button/button.component';
import { CircleProgressBarComponent } from './shared/circle-progress-bar/circle-progress-bar.component';
import { ModalComponent } from './shared/modal/modal.component';
import { SelectComponent } from './shared/select/select.component';
import { HeaderComponent } from './core/header/header.component';
import { ContainerComponent } from './core/container/container.component';
import { RegisterAppointmentComponent } from './features/register-appointment/register-appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    InputComponent,
    ButtonComponent,
    CircleProgressBarComponent,
    ModalComponent,
    SelectComponent,
    HeaderComponent,
    ContainerComponent,
    RegisterAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SigninComponent} from "./signin/signin.component";
import {BrowserModule} from "@angular/platform-browser";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import { SignupComponent } from './signup/signup.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import {RouterLink} from "@angular/router";
import {SignRoutingModule} from "./sign-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxSpinnerModule} from "ngx-spinner";
import { DemoComponent } from './demo/demo.component';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    EmailConfirmationComponent,
    DemoComponent
  ],
  providers: [
    BsModalService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    RouterLink,
    SignRoutingModule,
    NgxSpinnerModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SignModule { }

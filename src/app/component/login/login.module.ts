import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { EmailValidatorDirective } from '../shared/directive/email-validator.directive';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    EmailValidatorDirective,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class LoginModule { }

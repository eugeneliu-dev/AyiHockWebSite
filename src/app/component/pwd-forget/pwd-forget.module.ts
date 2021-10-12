import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PwdForgetComponent } from './pwd-forget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PwdForgetRoutingModule } from './pwd-forget-routing.module';


@NgModule({
  declarations: [
    PwdForgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PwdForgetRoutingModule
  ]
})
export class PwdForgetModule { }

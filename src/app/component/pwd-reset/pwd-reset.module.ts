
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PwdResetComponent } from './pwd-reset.component';
import { PwdResetRoutingModule } from './pwd-reset-routing.module';


@NgModule({
  declarations: [PwdResetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PwdResetRoutingModule
  ]
})
export class PwdResetModule { }

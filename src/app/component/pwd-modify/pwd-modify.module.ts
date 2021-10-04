import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PwdModifyComponent } from './pwd-modify.component';
import { PwdModifyRoutingModule } from './pwd-modify-routing.module';

@NgModule({
  declarations: [PwdModifyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PwdModifyRoutingModule
  ]
})
export class PwdModifyModule { }

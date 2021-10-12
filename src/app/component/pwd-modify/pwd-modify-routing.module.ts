import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from 'src/app/service/authentication-guard.service';

import { PwdModifyComponent } from './pwd-modify.component';

const routes: Routes = [
  {
    path: '',
    component: PwdModifyComponent, canActivate: [AuthenticationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PwdModifyRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticationGuardService } from 'src/app/service/unauthentication-guard.service';

import { PwdResetComponent } from './pwd-reset.component';

const routes: Routes = [
  {
    path: '',
    component: PwdResetComponent, canActivate: [UnauthenticationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PwdResetRoutingModule { }
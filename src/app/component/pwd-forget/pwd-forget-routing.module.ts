import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticationGuardService } from 'src/app/service/unauthentication-guard.service';

import { PwdForgetComponent } from './pwd-forget.component';

const routes: Routes = [
  {
    path: '',
    component: PwdForgetComponent, canActivate: [UnauthenticationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PwdForgetRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from 'src/app/service/authentication-guard.service';

import { UserOrderlistComponent } from './user-orderlist.component';

const routes: Routes = [
  {
    path: '',
    component: UserOrderlistComponent, canActivate: [AuthenticationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOrderlistRoutingModule { }
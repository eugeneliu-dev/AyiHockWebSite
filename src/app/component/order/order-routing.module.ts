import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from 'src/app/service/authentication-guard.service';

import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent, canActivate: [AuthenticationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
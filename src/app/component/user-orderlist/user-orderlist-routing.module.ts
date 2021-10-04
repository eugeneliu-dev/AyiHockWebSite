import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserOrderlistComponent } from './user-orderlist.component';

const routes: Routes = [
  {
    path: '',
    component: UserOrderlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOrderlistRoutingModule { }
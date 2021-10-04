import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PwdModifyComponent } from './pwd-modify.component';

const routes: Routes = [
  {
    path: '',
    component: PwdModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PwdModifyRoutingModule { }
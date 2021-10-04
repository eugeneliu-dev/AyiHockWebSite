import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // imports: [RouterModule.forRoot(routes, {
  //   enableTracing: true,
  //   useHash: true
  // })],
  exports: [RouterModule]
})
export class HomeRoutingModule { }


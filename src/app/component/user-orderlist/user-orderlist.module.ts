import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserOrderlistComponent } from './user-orderlist.component';
import { UserOrderlistRoutingModule } from './user-orderlist-routing.module';

@NgModule({
  declarations: [UserOrderlistComponent],
  imports: [
    CommonModule,
    UserOrderlistRoutingModule
  ]
})
export class UserOrderlistModule { }

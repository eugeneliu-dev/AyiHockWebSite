import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    FormsModule,
    CommonModule,  
    OrderRoutingModule
  ]
})
export class OrderModule { }
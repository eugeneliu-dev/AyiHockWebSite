import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutLocationComponent } from './about-location.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  declarations: [
    AboutLocationComponent
  ],
  exports: [AboutLocationComponent]
})
export class AboutLocationModule { }

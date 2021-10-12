import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-location',
  templateUrl: './about-location.component.html',
  styleUrls: ['./about-location.component.css']
})
export class AboutLocationComponent implements OnInit {

  mapOptions: google.maps.MapOptions = {
    center: { lat: 25.018132, lng: 121.425666 },
    zoom : 16
  }
  marker = {
    position: { lat: 25.018132, lng: 121.425666 },
  }

  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-location',
  templateUrl: './about-location.component.html',
  styleUrls: ['./about-location.component.css']
})
export class AboutLocationComponent implements OnInit {

  center: google.maps.LatLngLiteral = {
    lat: 25.01872,
    lng: 121.42584
  };

  zoom = 17;

  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    backgroundColor: '#126df5',
    clickableIcons: false,
    disableDoubleClickZoom: true,
    draggable: true,
    zoomControl: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

}

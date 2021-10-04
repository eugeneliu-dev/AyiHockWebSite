import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { appPath } from 'src/app/constant/app-path.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  path = appPath;

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  mealBtnClick() {
    this.router.navigate(['meals']);
  }

  aboutBtnClick() {
    this.router.navigate(['about']);
  }

  newsBtnClick() {
    this.router.navigate(['/news']);
  }
}

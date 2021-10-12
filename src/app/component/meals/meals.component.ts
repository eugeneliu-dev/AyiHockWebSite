import { Result } from './../../model/result-format';
import { Component, OnInit} from '@angular/core';

// Constant
//import { appPath } from '../../constant/app-path.const';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MealsGet, MealTypesGet } from 'src/app/model/meals-get';
import { UserModel } from 'src/app/model/user-model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { MealsUtilsService } from 'src/app/service/meals-utils.service';
import { OrderUtilsService } from './../../service/order-utils.service';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  checkoutText: string = "前往訂購";
  totalAmount: number = 0;

  meals: MealsGet[] = [];
  mix_meals: MealsGet[] = [];
  double_meals: MealsGet[] = [];
  others_meals: MealsGet[] = [];
  mealtypes: MealTypesGet[] = [];

  show_mix_meals = true;
  show_double_meals = false;
  show_others_meals = false;

  userSubscription!: Subscription;
  user!: UserModel;
  tmpOrder: MealsGet[] = [];

  result!: Result;

  constructor(private router: Router,
    private auth: AuthenticationService,
    private mealsUtils: MealsUtilsService,
    private orderUtils: OrderUtilsService,
    private decodeService: EncryptDecryptService) { 
      router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
          if (event.navigationTrigger === 'popstate' && event.url === '/order') {
            this.router.navigate(['meals']);
          }
        }
      });
    }

  ngOnInit(): void {

    this.userSubscription = this.auth.getloginUserModel().subscribe(model => {
      this.user = model;
    });

    this.mealsUtils.getMealTypes().then(data => {
      this.mealtypes = data.Data.map((a: any) => new MealTypesGet(a));
    });

    if (localStorage.getItem(btoa(this.user.getName)) !== null) {
      this.meals = JSON.parse(this.decodeService.aesDecrypt(<any>localStorage.getItem(btoa(this.user.getName))));
      this.allocateMeals();
    }
    else {
      this.mealsUtils.getMeals().then(data => {
        this.meals = data.Data.map((a: any) => new MealsGet(a));
        this.allocateMeals();
      });
    }
  }


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  routeToOrder() {
    this.router.navigate(['order']);
    this.setOrder();
  }

  allocateMeals() {
    for (var meal of this.meals) {
      if (meal.quantity > 0) {
        this.totalAmount += (meal.quantity*meal.price);
      }

      switch (meal.type) {
        case 1:
          this.mix_meals.push(meal);
          break;
        case 2:
          this.double_meals.push(meal);
          break;
        case 3:
          this.others_meals.push(meal);
          break;
      }
    }
  }


  addOne(meal: MealsGet) {
    if (meal.quantity < 10) {
      meal.quantity++;
      this.totalAmount += meal.price;
    }
  }

  subOne(meal: MealsGet) {
    if (meal.quantity > 0) {
      meal.quantity--;
      this.totalAmount -= meal.price;
    }
  }

  changeType(typeid: number) {
    this.show_mix_meals = false;
    this.show_double_meals = false;
    this.show_others_meals = false;

    switch (typeid) {
      case 1:
        this.show_mix_meals = true;
        break;
      case 2:
        this.show_double_meals = true;
        break;
      case 3:
        this.show_others_meals = true;
        break;
    }
  }

  setOrder() {
    this.meals =[];
    this.meals = [...this.mix_meals, ...this.double_meals, ...this.others_meals];
    this.orderUtils.setOrder(this.meals);
  }

  getMix() {
    return this.mix_meals;
  }
}

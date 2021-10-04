import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderUtilsService } from './../../service/order-utils.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Subscription } from 'rxjs';
import { MealsGet } from 'src/app/model/meals-get';
import { UserModel } from './../../model/user-model';
import { OrderContentPost, OrderPost } from '../../model/order-model';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { NavigationStart, Router } from '@angular/router';
import { AlertFormService } from './../../service/alert-form.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  orderSubscription!: Subscription;
  userSubscription!: Subscription;
  order: MealsGet[] = [];
  user!: UserModel;
  finalOrderPost!: OrderPost
  totalAmount = 0;

  phone: string = '0919198978';
  payments = ['信用卡', 'LINE Pay', 'Google Pay', 'Apple Pay'];
  paymentSelected: string = '信用卡';

  constructor(private orderUtils: OrderUtilsService, 
              private auth: AuthenticationService,  
              private decodeService: EncryptDecryptService,
              private alert: AlertFormService,
              private router: Router) {
                router.events.forEach((event) => {
                  if(event instanceof NavigationStart) {
                    if (event.navigationTrigger === 'popstate') {
                      this.saveOrderToLocalStorage();
                    }
                  }
                });
               }

  ngOnInit(): void {

    this.userSubscription = this.auth.getloginUserModel().subscribe(model => {
      this.user = model;
    });

    this.orderSubscription = this.orderUtils.getOrder().subscribe(order => {
      if (order.length > 0) {
        for (var item of order) {
          if (item.quantity > 0) {
            this.order.push(item);
          }
        }
        this.saveOrderToLocalStorage();
      }
      else {
        try {
          this.order = JSON.parse(this.decodeService.aesDecrypt(<any>localStorage.getItem(btoa(this.user.getName))));
        } catch (e) {
          console.error(e);
        }
      }
    });

    for (var item of this.order){
      this.totalAmount += (item.price * item.quantity);
    }
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
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

  saveOrderToLocalStorage() {
    localStorage.setItem(btoa(this.user.getName), this.decodeService.aesEncrypt(JSON.stringify(this.order)));
  }

  orderConfirm() {
    if (this.phone.length !== 10) {
      this.alert.opensweetalertdng('資料有誤', '請確認手機輸入是否正確')
    }
    else {
      this.alert.opensweetalert('付款成功');
      this.finalOrderPost = new OrderPost(1, 0, '', 0, []);
      this.finalOrderPost.OrdererPhone = this.phone;
      this.finalOrderPost.Status = 1;
      this.finalOrderPost.PayRule = 1;
      this.finalOrderPost.TotalPrice = this.totalAmount;
           
      for (var item of this.order) {
        var orderContent = new OrderContentPost(item.mealId, item.quantity);
        this.finalOrderPost.OrderContents.push(orderContent);
      }

       this.orderUtils.orderPost(this.finalOrderPost)
      .then(res => console.log(res))
      .catch(err => console.log(err));

      localStorage.removeItem(btoa(this.user.getName));
    }
  }




}

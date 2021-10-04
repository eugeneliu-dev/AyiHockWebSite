import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MealsGet } from '../model/meals-get';
import { OrderGet, OrderPost } from '../model/order-model';
import { Result } from '../model/result-format';
import { AlertFormService } from './alert-form.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderUtilsService {

  //orderContentSubject = new Subject<MealsGet[]>();
  orderContentSubject = new BehaviorSubject<MealsGet[]>([]);
  orders: MealsGet[] = [];
  receivedOrderList: OrderGet[] = [];

  constructor(private conf: ConfigService, private http: HttpClient, private alert: AlertFormService) { }

  setOrder(allMeals: MealsGet[]) {
    this.orderContentSubject.next(allMeals);
  }

  getOrder() {
    return this.orderContentSubject.asObservable();
  }

  orderPost(orderPost: OrderPost) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
    //JSON.stringify(orderPost)
    return this.http.post<Result>(this.conf.apiUrl + "order", orderPost, httpOptions).pipe(tap(res => {
      if (!res.Success)
      {
        this.alert.opensweetalertdng('訂單送出失敗', '請重新點選後再送出')
      }
    },
    error => {
      //log
    }
    )).toPromise();
  }

  getReceivedOrderList(): Observable<OrderGet[]> {
    return this.http.get<Result>(this.conf.apiUrl + "order")
    .pipe(map(res => {
      if (res.Success) {
        return this.receivedOrderList = res.Data as OrderGet[];
      }
      else {
        return this.receivedOrderList = [];
      }
    }))
  }


}

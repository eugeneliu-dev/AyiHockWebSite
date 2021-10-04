import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MealsGet, MealTypesGet } from '../model/meals-get';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Result } from '../model/result-format';

@Injectable({
  providedIn: 'root'
})
export class MealsUtilsService {

  constructor(private http: HttpClient, private conf: ConfigService) { }

  //MealTypesGet[]
  getMealTypes(): Promise<Result> {
    return this.http.get<Result>(this.conf.apiUrl + "meal/types")
      .pipe(map((res) => {
        if (!res.Success)
        {
          console.log("Get MealTypes Failed!");
        }

        return res;
      })).toPromise();
  }

  //MealsGet[]
  getMeals(): Promise<Result> {
    return this.http.get<Result>(this.conf.apiUrl + "meal")
      .pipe(map(res => {
        if (res.Success)
        {
          for (var item of res.Data)
          {
            item.quantity = 0;
          }
        }
        else
        {
          console.log("Get MealList Failed!");
        }

        return res;
      })).toPromise();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AlertFormService } from './alert-form.service';
import { map, tap } from 'rxjs/operators';
import { Result } from '../model/result-format';
import { UserPwdForgetModel, UserPwdModifyModel, UserPwdResetModel } from '../model/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUtilsService {

  constructor(private conf: ConfigService, private http: HttpClient, private alert: AlertFormService) { }


  userModifyPwd(userPwdModifyModel: UserPwdModifyModel) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    
    return this.http.put<Result>(this.conf.apiUrl + "customer/user/pwdmodify", userPwdModifyModel, httpOptions)
      .pipe(tap(res => {
        return res;
      },
        error => {
          //log
        }
      )).toPromise();
  }


  userResetPwd(userPwdResetModel: UserPwdResetModel): Observable<Result> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.http.put<Result>(this.conf.apiUrl + "customer/user/pwdreset", userPwdResetModel, httpOptions)
    .pipe(map(res => {
      return res;
    }))
  }

  userForgetPwd(userPwdForgetModel: UserPwdForgetModel): Observable<Result> {
    return this.http.put<Result>(this.conf.apiUrl + "customer/user/pwdforget", userPwdForgetModel)
    .pipe(map(res => {
      return res;
    }))
  }


}

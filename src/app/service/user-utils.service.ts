import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AlertFormService } from './alert-form.service';
import { tap } from 'rxjs/operators';
import { Result } from '../model/result-format';
import { UserPwdModifyModel } from '../model/user-model';

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

}

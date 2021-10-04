import { SignupPost } from './../model/signup-post';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AlertFormService } from './alert-form.service';
import { tap } from 'rxjs/operators';
import { Result } from '../model/result-format';

@Injectable({
  providedIn: 'root'
})
export class SignupUtilsService {

  constructor(private conf: ConfigService, private http: HttpClient, private alert: AlertFormService) { }


  signup(signupPost: SignupPost) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<Result>(this.conf.apiUrl + "customer", signupPost, httpOptions).pipe(tap(res => {
      return res;
    },
    error => {
      //log
    }
    )).toPromise();
  }

}

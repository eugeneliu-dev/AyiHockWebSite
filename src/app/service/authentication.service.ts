import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from '../model/user-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigService } from '../service/config.service';
import { Result } from '../model/result-format';
import { AlertFormService } from './alert-form.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userModel = new UserModel('', '', '', 0);
  //userWithSocial!: SocialUser

  loginStatusSubject$ = new BehaviorSubject<boolean>(false);
  loginUserSubject$ = new BehaviorSubject<UserModel>(this.userModel);

  constructor(private http: HttpClient, 
              private jwtHelper: JwtHelperService, 
              private router: Router, 
              private conf: ConfigService, 
              private alert: AlertFormService, 
              private socialAuthService: SocialAuthService) { }

  login(email: string, password: string): Promise<Result> {
    return this.http.post<Result>(this.conf.apiUrl + "login/normal", { email, password })
      .pipe(tap(res => {
        if (res.Success)
        {
          let jwt = String(res.Data);
          localStorage.setItem('jwt', jwt);
          const decodeToken = this.jwtHelper.decodeToken(jwt);
          this.userModel = new UserModel(decodeToken.unique_name, decodeToken.email, decodeToken.role, 0);

          this.loginStatusSubject$.next(true);
          this.loginUserSubject$.next(this.userModel);
        }
        else
        {
          this.alert.opensweetalertdng('登入失敗', '請確認帳號/密碼是否正確')
        }

        return res;
      },
      error => {
        //log
      }
      )).toPromise();
  }

  loginGoogle(name: string, email: string, token: string): Promise<Result> {
    return this.http.post<Result>(this.conf.apiUrl + "login/google", { name, email, token })
      .pipe(tap(res => {
        if (res.Success)
        {
          let jwt = String(res.Data);
          localStorage.setItem('jwt', jwt);
          const decodeToken = this.jwtHelper.decodeToken(jwt);
          this.userModel = new UserModel(decodeToken.unique_name, decodeToken.email, decodeToken.role, 1);

          this.loginStatusSubject$.next(true);
          this.loginUserSubject$.next(this.userModel);
        }
        else
        {
          this.alert.opensweetalertdng('Google登入失敗', res.Message)
        }

        this.socialAuthService.signOut(true);
        return res;
      },
      error => {
        //log
      })).toPromise();
  }

  logoutSetBlackToCache()
  {
    return this.http.post<Result>(this.conf.apiUrl + "login/logout", {})
      .pipe(tap(res => {
        return res;
      },
      error => {
        //log
      })).toPromise();
  }

  logout() {

    if (this.jwtHelper.isTokenExpired(localStorage.getItem('jwt')!)) {
      this.loginStatusSubject$.next(false);
      const decodeToken = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
      localStorage.removeItem('jwt');
      localStorage.removeItem(btoa(decodeToken.unique_name));
    }
    else {
      this.logoutSetBlackToCache()
      .then(res => {
        if (res.Success) {
          this.loginStatusSubject$.next(false);
          const decodeToken = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
          localStorage.removeItem('jwt');
          localStorage.removeItem(btoa(decodeToken.unique_name));
        }
        else {
          console.log(res.Message);
        }
      }, err => {
        console.log(err);
      })
    }
  }

  getloginStatus() {
    return this.loginStatusSubject$.asObservable();
  }

  getloginUserModel() {
    return this.loginUserSubject$.asObservable();
  }

  checkUser(): Observable<boolean> {

    console.log("CheckUser: DDDDDDDD");
    

    if (this.loggedIn) {
        this.loginStatusSubject$.next(true);
        this.getUser();
        return of(true);
    } else {
        console.log('no token or token is expired');
        // localStorage.removeItem('jwt');
        // localStorage.removeItem(btoa(this.userModel.getName));
        return of(false);
    }
  }

  getUser() {
    const token = localStorage.getItem('jwt');
    if(token !== null) {
      const decodeToken = this.jwtHelper.decodeToken(token);
      this.userModel = new UserModel(decodeToken.unique_name, decodeToken.email, decodeToken.role, parseInt(decodeToken.platform, 10));
      this.loginUserSubject$.next(this.userModel);
    }
  }

  get loggedIn(): boolean {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }


}

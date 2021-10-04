import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private injector: Injector, private auth: AuthenticationService) { }

  // load(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //       return this.auth.checkUser()
  //           .subscribe(res => {
  //               if (res) {
  //                   setInterval(() => {
  //                       this.checkStatus();
  //                   }, 1000 * 3 * 1)    // check current status every 5 min
  //               }
  //               resolve(res);
  //           }, err => {
  //               console.log(err);
  //               reject(err);
  //           });
  //   });
  // }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      return setInterval(() => {
        this.auth.checkUser()
          .subscribe(res => {
            if (!res) {
              this.autoLogout();
            }
            resolve(res);
          }, err => {
            console.log(err);
            reject(err);
          });
      }, 1000 * 1 * 3);
    });
  }

  autoLogout() {
    if (!this.auth.loggedIn && localStorage.getItem('jwt') !== null) {   // if token expired
      this.auth.logout();
      const router = this.injector.get(Router);
      router.navigate(['home']);
    }
  }

}
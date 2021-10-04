import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

// Constant
import { appPath } from './constant/app-path.const';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from './model/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [AuthenticationService]
})
export class AppComponent implements OnInit {

  title = 'AyiHockWebsite';
  //loginText = '登入';
  path = appPath;
  isLogged = false;

  userModel!: UserModel;
  userWithSocial!: SocialUser;

  public subLoginStatus: Subscription = new Subscription();
  public subUserModel: Subscription = new Subscription();

  constructor(private router: Router, private auth: AuthenticationService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {

    this.subLoginStatus = this.auth.getloginStatus().subscribe(status => {
      this.isLogged = status;
    });

    this.subUserModel = this.auth.getloginUserModel().subscribe(model => {
      this.userModel = model;
    });
  }

  logout() {
    this.auth.logout();
  }

}

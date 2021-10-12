import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { StartupService } from 'src/app/service/startup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  invalidLogin!: boolean;
  email = '';
  password = '';

  userWithSocial!: SocialUser
  loggedIn!: boolean;

  constructor(private router: Router, private auth: AuthenticationService, private socialAuthService: SocialAuthService, private startupService: StartupService) { }

  ngOnInit(): void {

  }

  routeToSignup() {
    this.router.navigate(['signup']);
  }

  routeToPwdForget() {
    this.router.navigate(['pwd-forget']);
  }

  signInWithGoogle(): void {
    let isCalled = false;
    
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      this.userWithSocial = user;
      this.loggedIn = (user != null);
      
      
      if(this.loggedIn  && !isCalled) {
        isCalled = true;

        this.auth.loginGoogle(this.userWithSocial.name, this.userWithSocial.email, this.userWithSocial.idToken)
          .then(response => {
            this.router.navigate(['home']);
          },
            err => {
          });

      }
    });
  }

  onSubmit() {
    this.auth.login(this.email, this.password)
      .then(response => {
        this.invalidLogin = false;
        this.router.navigate(['home']);
      }, err => {
        this.invalidLogin = true;
      })

    // const credentials = {
    //   'email': form.value.mail,
    //   'password': form.value.pwd
    // }

    // this.http.post("https://localhost:44394/api/login/signin", credentials, { responseType: 'text' })
    //   .subscribe(
    //     response => {
    //       this.invalidLogin = false;
    //       this.router.navigate(['home']);
    //     },
    //     err => {
    //       this.invalidLogin = true;
    //     })



    // this.auth.login(form.value.mail, form.value.pwd)
    // .pipe(first())
    // .subscribe(
    // data => {
    //   this.router.navigate(['/about']);
    // },
    // error => {
    //   console.log(error);
    // });
  }

}

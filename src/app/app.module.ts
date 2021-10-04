import { ConfigService } from 'src/app/service/config.service';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { StartupService } from './service/startup.service';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
//import { PaymentComponent } from './component/payment/payment.component';
//import { LoginComponent } from './component/login/login.component';
//import { SignupComponent } from './component/signup/signup.component';
//import { EmailValidatorDirective } from './component/login/email-validator.directive';
//import { FormsModule } from '@angular/forms';
// import { AboutComponent } from './component/about/about.component';
// import { NewsComponent } from './component/news/news.component';
// import { HomeComponent } from './component/home/home.component';
// import { CartComponent } from './component/cart/cart.component';
// import { SuccessComponent } from './component/success/success.component';
// import { ProductsComponent } from './component/products/products.component';
// import { MealsComponent } from './component/meals/meals.component';


@NgModule({
  declarations: [
    AppComponent,
    //PaymentComponent,
    //LoginComponent,
    //SignupComponent,
    //EmailValidatorDirective,
    // AboutComponent,
    // NewsComponent,
    // HomeComponent,
    // CartComponent,
    // SuccessComponent,
    // ProductsComponent,
    // MealsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44394"],
        disallowedRoutes: ["https://localhost:44394/api/login/signin"]
      }
    })
  ],
  providers: [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService, Injector],
      multi: true
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService, Injector],
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '730644139443-1s6dsft5mu2kf7l4bg5jscggjs2lmr18.apps.googleusercontent.com' // 於 google 申請的應用程式 client id
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

export function configServiceFactory(configServiceService: ConfigService): Function {
  return () => configServiceService.loadConfig();
}

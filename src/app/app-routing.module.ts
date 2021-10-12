import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appPath } from './constant/app-path.const';
import { PreloadAllModules } from '@angular/router';
// import { SignupComponent } from './component/signup/signup.component';
// import { ProductsComponent } from './component/products/products.component';
// import { MealsComponent } from './component/meals/meals.component';
// import { NewsComponent } from './component/news/news.component';
// import { LoginComponent } from './component/login/login.component';
// import { HomeComponent } from './component/home/home.component';
// import { AboutComponent } from './component/about/about.component';


const routes: Routes = [
  {
    path: appPath.root,
    loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule)
  },
  {
    path: appPath.home,
    loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule)
  },
  {
    path: appPath.news,
    loadChildren: () => import('./component/news/news.module').then(m => m.NewsModule)
  },
  {
    path: appPath.meals,
    loadChildren: () => import('./component/meals/meals.module').then(m => m.MealsModule)
  },
  {
    path: appPath.order,
    loadChildren: () => import('./component/order/order.module').then(m => m.OrderModule)
  },
  {
    path: appPath.payment,
    loadChildren: () => import('./component/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: appPath.login,
    loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule)
  },
  {
    path: appPath.signup,
    loadChildren: () => import('./component/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: appPath.about,
    loadChildren: () => import('./component/about/about.module').then(m => m.AboutModule)
  },
  {
    path: appPath.success,
    loadChildren: () => import('./component/success/success.module').then(m => m.SuccessModule)
  },
  {
    path: appPath.pwd_forget,
    loadChildren: () => import('./component/pwd-forget/pwd-forget.module').then(m => m.PwdForgetModule)
  },
  {
    path: appPath.pwd_modify,
    loadChildren: () => import('./component/pwd-modify/pwd-modify.module').then(m => m.PwdModifyModule)
  },
  {
    path: appPath.pwd_reset,
    loadChildren: () => import('./component/pwd-reset/pwd-reset.module').then(m => m.PwdResetModule)
  },
  {
    path: appPath.user_orderlist,
    loadChildren: () => import('./component/user-orderlist/user-orderlist.module').then(m => m.UserOrderlistModule)
  },

  // { path: '', component: HomeComponent},
  // { path: 'home', component: HomeComponent},
  // { path: 'login', component: LoginComponent},
  // { path: 'signup', component: SignupComponent},
  // { path: 'news', component: NewsComponent},
  // { path: 'products', component: ProductsComponent},
  // { path: 'meals', component: MealsComponent},
  // { path: 'about', component: AboutComponent},
  // { path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    //useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

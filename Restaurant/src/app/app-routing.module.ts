import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { LoginGuardGuard } from './auth/login-guard.guard';
import { FoodItemsComponent } from './components/food-items/food-items.component';
import { FoodServicesComponent } from './components/food-services/food-services.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpwdComponent } from './components/resetpwd/resetpwd.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'merchant', children: [

      { path: 'signUp', component: RegisterComponent},
      { path: 'login', component: LoginComponent ,canActivate:[LoginGuardGuard]},
      {path:'food-items', component:FoodServicesComponent,canActivate:[AuthGuardGuard]},
      {path:'viewCart',component:ViewCartComponent,canActivate:[AuthGuardGuard]},
      {path:'profile', component:ProfileComponent,canActivate:[AuthGuardGuard]},
      {path:"forgotPassword",component:ResetpwdComponent}
    ]
  }


]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
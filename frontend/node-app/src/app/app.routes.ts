import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { resolver } from './utils/resolvers/resolver';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'register', component: RegisterComponent, title: 'Register'},
  {path: 'dashboard', component: DashboardComponent, resolve: {data: resolver}, title: 'Dashboard'},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

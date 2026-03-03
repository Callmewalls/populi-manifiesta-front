import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { LoginComponent } from './app/auth/login/login.component';
import { RegisterComponent } from './app/auth/register/register.component';


export const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: '**', redirectTo: '/home' }
];
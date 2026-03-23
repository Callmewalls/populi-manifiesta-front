import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/core/layout/layout.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // protege el layout completo
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/home-related/home.module').then(m => m.HomeModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./components/event-related/event.module').then(m => m.EventsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./components/profile-related/profile.module').then(m => m.ProfileModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
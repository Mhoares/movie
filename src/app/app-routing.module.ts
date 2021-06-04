import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuardGuard } from './login/authentication-guard.guard';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', canActivate:[AuthenticationGuardGuard], 
  children: [
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'details/:type/:id', loadChildren: () => import('./movie-details/movie-details.module').then(m => m.MovieDetailsModule) },
  ]},
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

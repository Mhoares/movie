import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router ,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthServiceService){

    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currenTokens = this.authService.currenTokensValue;
    if(currenTokens){
      this.authService.refreshToken().subscribe(
        {
          error: () => this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
        }
      );
      console.log("paso");
      return true;
      
    }
    console.log(" no paso");
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
}

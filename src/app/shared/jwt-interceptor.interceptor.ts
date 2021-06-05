import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthServiceService } from '../login/auth-service.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthServiceService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    const currenTokens :any = this.auth.currenTokensValue;
    const isAPI = request.url.startsWith("http://161.35.140.236:9005");
    const isRefresh = request.url =="http://161.35.140.236:9005/api/auth/refresh"
    
    if (currenTokens && isAPI && !isRefresh ) {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currenTokens.token}`
        }
      });
    }
    if(this.auth.isTokenExpired()  && !isRefresh)
    return this.auth.getRefreshToken().pipe(
      mergeMap(() =>next.handle(request)),
      catchError(() =>{
        this.router.navigate(['/login'])
        return throwError("No se pudo refrescar el token")
      })
    )
    else
    return next.handle(request);
  }
}

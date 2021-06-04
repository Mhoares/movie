import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../login/auth-service.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    const currenTokens :any = this.auth.currenTokensValue;
    const isAPI = request.url.startsWith("http://161.35.140.236:9005");
    const isRefresh = request.url =="http://161.35.140.236:9005/api/auth/refresh"
    
    if (currenTokens && isAPI && !isRefresh ) {
      this.auth.refreshToken();
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currenTokens.token}`
        }
      });
    }
    return next.handle(request);
  }
}

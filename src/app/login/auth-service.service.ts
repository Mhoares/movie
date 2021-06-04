import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private currentUserSubject: BehaviorSubject<any>;
  private currenTokensSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public currenTokens: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currenTokensSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currenTokens')));
    this.currenTokens = this.currenTokensSubject.asObservable();
   }
  public get currenTokensValue():any{
    return this.currenTokensSubject.value
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string) {

    const url = "http://161.35.140.236:9005/api/auth/login"
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post(url, JSON.stringify({username, password}), options)
    .pipe(

      map((res :any ) => {
    
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      this.currentUserSubject.next(res.data.user);
      localStorage.setItem('currenTokens', JSON.stringify(res.data.payload));
      this.currenTokensSubject.next(res.data.payload);
      console.log(res);
      return res.data.user;
  }),
  catchError((error: HttpErrorResponse) => {return throwError( error)}))
  ;

  }
  decodeToken( token :string){
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }
  refreshToken(){
    const  decodedToken : any = this.decodeToken(this.currenTokensValue.token) 
    const exp = decodedToken && decodedToken.exp;
    const refresh_token = this.currenTokensValue.refresh_token
    const url = "http://161.35.140.236:9005/api/auth/refresh"
    const options = {headers: {'Content-Type': 'application/json'}};
     if (Date.now() > exp){
      return this.http.post(url, JSON.stringify({refresh_token}), options)
      .pipe(
        map((res : any) => {
         const tokens = this.currenTokensValue
         tokens.token = res.data.payload.token
        localStorage.setItem('currenTokens', JSON.stringify(tokens));
        this.currenTokensSubject.next(tokens);
        return res.data.user;
    }),
    catchError((error: HttpErrorResponse) => {return throwError( error)}))
    ;

     }

  }

}

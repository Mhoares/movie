import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getUser(){
    const url = "http://161.35.140.236:9005/api/user/me"
    return this.http.get(url).pipe(
      map( (res: any) =>  {return res.data})
    )
  }
}

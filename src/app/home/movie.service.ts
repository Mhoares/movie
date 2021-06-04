
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private popularMovies: any[];
  private premiereMovies: any[];
  public imageBase;

  constructor(private http:HttpClient) {
    this.popularMovies =[];
    this.premiereMovies = [];

   }
   public set popular( movies){
    this.popularMovies = this.popularMovies.concat(movies)
   }
   public set premiere( movies){
     this.premiereMovies = this.premiereMovies.concat(movies)

  }
  getPremiereMovies(page){
    const url = "http://161.35.140.236:9005/api/movies/now_playing"
    const params = new HttpParams().set('page', page);
    return this.http.get(url, { params: params }).pipe(
      map( (res: any) =>  {
        this.imageBase = res.imageBaseUrl
        return res;
      }),
      catchError( error => {return throwError(error)})
    )
  }
  getPopularMovies(page){
    const url = "http://161.35.140.236:9005/api/movies/popular"
    const params = new HttpParams().set('page', page);
    return this.http.get(url, { params: params }).pipe(
      map( (res: any) =>  {
        this.imageBase = res.imageBaseUrl;
        return res;
      }),
      catchError( error => {return throwError(error)})
    )
  }
  getActors(movieId){
    const url = `http://161.35.140.236:9005/api/movies/${movieId}/actors`

    return this.http.get(url).pipe(
      map( (res: any) =>  {
        return res;
      }),
      catchError( error => {return throwError(error)})
    )
  }
  
  public findPopular(id){
    return this.popularMovies.find( movie => movie.id == id)
  }
  public findPremiere(id){
    return this.premiereMovies.find( movie => movie.id == id)
  }
}

import { Component, OnInit } from '@angular/core';

import { MovieService } from '../movie.service';

@Component({
  selector: 'app-premiere-movies',
  templateUrl: './premiere-movies.component.html',
  styleUrls: ['./premiere-movies.component.css']
})
export class PremiereMoviesComponent implements OnInit {

  constructor(private service:MovieService) { }
  imageBase;
  movies: any[] = [];
  page:number = 1;

  ngOnInit(): void {
    this.getMovies()
  }
  getMovies(){
    this.service.getPremiereMovies(this.page).subscribe(
      {
        next: res =>{
          this.imageBase = res.imageBaseUrl;
          this.movies = this.movies.concat(res.data);
          this.service.premiere = res.data;
        },
        error: error => console.log(error)
      }
    )

  }
  onScrollRight(){
    this.page++;
    this.getMovies();
    console.log("scrolled")

  }


}

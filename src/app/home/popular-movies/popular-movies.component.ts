import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent implements OnInit {

  constructor(private service:MovieService) { }
  imageBase;
  movies: any[] = [];
  page:number = 1;
  ngOnInit(): void {
    this.getMovies()
  }
  getMovies(){
    this.service.getPopularMovies(this.page).subscribe(
      {
        next: res =>{
          this.imageBase = res.imageBaseUrl;
          this.movies = this.movies.concat(res.data);
          this.service.popular = res.data;
        },
        error: error => console.log(error)
      }
    )

  }
  onScroll(){
    this.page++;
    console.log(this.page);
    this.getMovies();

  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserComponent } from './user/user.component';
import { MovieComponent } from './movie/movie.component';
import { PremiereMoviesComponent } from './premiere-movies/premiere-movies.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [HomeComponent, UserComponent, MovieComponent, PremiereMoviesComponent, PopularMoviesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    InfiniteScrollModule
  ]
})
export class HomeModule { }

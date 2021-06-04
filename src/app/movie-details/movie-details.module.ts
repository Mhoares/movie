import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { RepartoComponent } from './reparto/reparto.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ActorComponent } from './actor/actor.component';


@NgModule({
  declarations: [MovieDetailsComponent, RepartoComponent, ActorComponent],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
     InfiniteScrollModule
  ]
})
export class MovieDetailsModule { }

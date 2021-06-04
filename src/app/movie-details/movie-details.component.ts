import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../home/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private service:MovieService, private route: ActivatedRoute) { }
  public movie:any;
  public poster:any;
  public photo:any;
  public actors:any[] =[];
  ngOnInit(): void {
     const type = this.route.snapshot.paramMap.get("type");
     const id = this.route.snapshot.paramMap.get("id");

    if(type =="popular"){
      this.movie = id && this.service.findPopular(id);
      this.poster = this.service.imageBase +this.movie.poster_path;
      this.photo = this.service.imageBase +this.movie.backdrop_path;
      
    }else if(type == "premiere"){
      this.movie = id && this.service.findPremiere(id);
      this.poster = this.service.imageBase +this.movie.poster_path;
      this.photo = this.service.imageBase +this.movie.backdrop_path;
      
    }
    

  }

}

import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/home/movie.service';

@Component({
  selector: 'app-reparto',
  templateUrl: './reparto.component.html',
  styleUrls: ['./reparto.component.css']
})
export class RepartoComponent implements OnInit {
  @Input() id : any;
  data:any;
  actors: any[]= [];
  visibleActors: any[]= [];
  imageBase:any;
  constructor(private service:MovieService) {
    
   }

  ngOnInit(): void {
    this.service.getActors(this.id).subscribe(
      {
        next: res => {
          this.data= res
          this.actors = this.data.data;
          this.imageBase = this.data.imageBaseUrl;
          this.visibleActors = this.actors.splice(0,4);
        }
      }
    )

  }
  onScrollRight(){
    if(this.actors.length){
      this.visibleActors = this.visibleActors.concat(this.actors.splice(0,4));
    }
  }

}

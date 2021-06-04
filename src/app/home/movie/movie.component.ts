import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() image;
  @Input() name;
  @Input() id;
  @Input() type;
  constructor() { }

  ngOnInit(): void {
  }

}

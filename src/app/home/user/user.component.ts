import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user :any;
  constructor( private service: UserService) { }
  
  ngOnInit(): void {
    this.service.getUser().subscribe(
      {
        next: user => this.user = user,
        error: () => console.log("error")
      }
    )
  }

}

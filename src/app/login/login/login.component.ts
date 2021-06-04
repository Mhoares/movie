import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthServiceService, private router: Router, private route: ActivatedRoute) { }
  public loginUser: FormGroup;
  error;
  

  ngOnInit(): void {
    this.loginUser = this.fb.group(
      {
        username:  ['', Validators.required],
        password: ['', Validators.required ],
      }
    )
    this.error = null;
  }
  onSubmit(){
    const username = this.loginUser.get("username").value;
    const password = this.loginUser.get("password").value;
    console.log(username)
    this.auth.login(username, password).subscribe({
        next: ()=>{
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigate([returnUrl]);

        },
        error: (error: HttpErrorResponse) => {this.error=error}
    })
   
   
  }

}

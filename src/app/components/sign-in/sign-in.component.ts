import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  username: string;
  password: string;

  constructor(public auth: AuthService,
              public router: Router) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

  Login() {
    this.auth.SignIn(this.username, this.password);
  }

}

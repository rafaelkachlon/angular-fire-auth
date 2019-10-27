import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username: string;
  password: string;

  constructor(public auth: AuthService,
              public router: Router) {
  }

  ngOnInit() {

  }

  Register() {
    this.auth.SignUp(this.username, this.password);
  }

}

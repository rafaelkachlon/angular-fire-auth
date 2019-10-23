import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService,
              public router: Router) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['sign-in']);
    }
  }
  ngOnInit() {
  }

  Logout() {
    this.auth.SignOut();
  }
}

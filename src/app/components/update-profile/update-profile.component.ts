import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../shared/services/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user: User;
  editName: false;

  constructor(public fireAuth: AngularFireAuth,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit() {
  }

  GetUserName() {
    return this.user.displayName || 'אין שם משתמש';
  }

  EditName() {
    this.fireAuth.authState.subscribe(auth =>
      auth.updateProfile({
        displayName: this.user.displayName
      }).then(res => {
        this.editName = false;
        console.log('name updated successfully');
      }));
  }

  Back() {
    this.router.navigate(['dashboard']);
  }
}

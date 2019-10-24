import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  guides: any[];
  title: string;
  content: string;

  constructor(public auth: AuthService,
              public router: Router,
              public db: AngularFirestore) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['sign-in']);
    }
  }

  ngOnInit() {
    this.db.collection('guides').snapshotChanges()
      .subscribe(res => {
        this.guides = res.map(x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ...data};
        });
      });
  }

  CreateGuide() {
    console.log(this.title);
    console.log(this.content);
    this.db.collection('guides')
      .add({
        title: this.title,
        content: this.content
      }).then(res => console.log(res));
  }

  DeleteGuide(gid: string) {
    this.db.collection('guides').doc(gid).delete();
  }

  Logout() {
    this.auth.SignOut();
  }
}

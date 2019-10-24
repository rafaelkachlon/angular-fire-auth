import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Expense {
  title: string;
  price: number;
  addedOn: Date;
}

export interface ExpenseId extends Expense {
  id: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  expensesCollection: AngularFirestoreCollection<Expense>;
  expenses: Observable<ExpenseId[]>;

  title: string;
  price: number;

  constructor(public auth: AuthService,
              public router: Router,
              private readonly db: AngularFirestore) {
    // if (!this.auth.isLoggedIn()) {
    //   this.router.navigate(['sign-in']);
    //   return;
    // }
    const user = JSON.parse(localStorage.getItem('user'));
    this.expensesCollection = db.collection<Expense>('expenses').doc(user.uid).collection('expenses');

    this.expenses = this.expensesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Expense;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));

  }

  ngOnInit() {
  }

  CreateExpense() {
    this.expensesCollection.add({
      title: this.title,
      price: this.price,
      addedOn: new Date()
    });
  }

  DeleteExpense(gid: string) {
    this.expensesCollection.doc(gid).delete();
  }

  Logout() {
    this.auth.SignOut();
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

export interface ExpenseList {
  title: string;
  description?: string;
  createdBy: string;
  createdDate: any;
  sharedWith: string[];
}

export interface ExpenseId extends ExpenseList {
  id: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  addListFlag = false;
  expensesCollection: AngularFirestoreCollection<ExpenseList>;
  sharedExpensesCollection: AngularFirestoreCollection<ExpenseList>;
  expenses: Observable<ExpenseId[]>;
  sharedExpenses$: Observable<ExpenseId[]>;
  title: string;
  description: string;
  shareWith = [{email: ''}];
  user: any;

  constructor(public auth: AuthService,
              public router: Router,
              private readonly db: AngularFirestore,
              public fireAuth: AngularFireAuth) {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.expensesCollection = db.collection<ExpenseList>(`expenses`,
      ref => ref.where('createdBy', '==', this.user.uid));

    this.sharedExpensesCollection = db.collection<ExpenseList>(`expenses`,
      ref => ref.where('sharedWith', 'array-contains', this.user.email));

    this.expenses = this.expensesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ExpenseList;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));

    this.sharedExpenses$ = this.sharedExpensesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ExpenseList;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));

  }

  ngOnInit() {
  }

  CreateExpense() {
    this.expensesCollection.add({
      title: this.title,
      description: this.description,
      createdBy: this.user.uid,
      createdDate: new Date(),
      sharedWith: this.shareWith.map(x => x.email)
    }).then(x => this.addListFlag = false);

  }

  DeleteExpenseList(eid: string) {
    this.expensesCollection.doc(eid).delete();
  }

  AddShareWithField() {
    this.shareWith.push({email: ''});
  }

  Logout() {
    this.auth.SignOut();
  }

  GetUserName() {
    return this.user.displayName || 'אין שם משתמש';
  }

  UpdateProfile() {
    this.router.navigate(['update-profile']);
  }
}

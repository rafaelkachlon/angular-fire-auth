import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {AuthService} from '../../shared/services/auth.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {ExpenseId} from '../dashboard/dashboard.component';
import {Observable} from 'rxjs';

export interface ExpenseItem {
  title: string;
  price: number;
  createdBy: string;
  createdDate: any;
}

export interface ExpenseItemId extends ExpenseItem {
  id: string;
}

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {
  title: string;
  user: any;
  expensesCollection: AngularFirestoreCollection<ExpenseItem>;
  expenses: Observable<ExpenseItemId[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public auth: AuthService,
              private readonly db: AngularFirestore,
              public fireAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.user = JSON.parse(localStorage.getItem('user'));
      const ExId = param.get('id');
      const currentExpenseList = this.db.doc<ExpenseId>(`/expenses/${ExId}`);
      currentExpenseList.get().subscribe(res => {
        this.title = res.data().title;
      });
      this.expensesCollection = currentExpenseList.collection<ExpenseItemId>('expenses');


      this.expenses = this.expensesCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ExpenseItem;
          const id = a.payload.doc.id;
          console.log({id, ...data});
          return {id, ...data};
        })));
    });


  }

}

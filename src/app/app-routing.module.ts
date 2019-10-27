import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {SecureInnerPagesGuard} from './shared/guard/secure-inner-pages.guard';
import {UpdateProfileComponent} from './components/update-profile/update-profile.component';
import {ExpensesListComponent} from './components/expenses-list/expenses-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'expenses/:id', component: ExpensesListComponent, canActivate: [AuthGuard]},
  {path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, SecureInnerPagesGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

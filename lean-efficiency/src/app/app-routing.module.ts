import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { PartialTopNavComponent } from './partial-top-nav/partial-top-nav.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create',
    component: TeamCreateComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'team',
    component: TeamListComponent
  },
  {
    path: ':hexTeamName/message/:hexConvName',
    component: MessageComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { PartialTopNavComponent } from './partial-top-nav/partial-top-nav.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamListComponent } from './team-list/team-list.component';
import { ConversationCreateComponent } from './conversation-create/conversation-create.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamManagementMemberComponent } from './team-management-member/team-management-member.component';
import { TeamManagementOverviewComponent } from './team-management-overview/team-management-overview.component';

const manageRoutes = [];

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
    path: ':hexTeamName',
    redirectTo: ':hexTeamName/message',
    pathMatch: 'full'
  },
  {
    path: ':hexTeamName/message/:hexConvName',
    component: MessageComponent
  },
  {
    path: ':hexTeamName/message',
    component: MessageComponent
  },
  {
    path: 'message/create-channel',
    component: ConversationCreateComponent
  },
  {
    path: ':hexTeamName/manage',
    component: TeamManagementComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: TeamManagementOverviewComponent },
      { path: 'member', component: TeamManagementMemberComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

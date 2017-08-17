import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { PbEditTemplateComponent } from './common/pb-edit-template/pb-edit-template.component';

// auth & layout
import { SignUpComponent } from './auth/signup/signup.component';
import { LogInComponent } from './auth/login/login.component';
import { LogOutComponent } from './auth/logout/logout.component';
import { PandoraBoxComponent } from './pandorabox.component'
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ErrorComponent } from './error/error/error.component';

// console
import { ConsoleMasterComponent } from './console/console-master/console-master.component';

// dashboard
import { DashboardMasterComponent } from './dashboard/dashboard-master/dashboard-master.component';
import { DashboardLayoutV1Component } from './dashboard/dashboard-layout-v1/dashboard-layout-v1.component';
// team
import { TeamAddQuickPanelComponent } from './team/team-add-quick-panel/team-add-quick-panel.component';

// ticket
import { TicketAddQuickPanelComponent } from './ticket/ticket-add-quick-panel/ticket-add-quick-panel.component';
import { TicketMasterComponent } from './ticket/ticket-master/ticket-master.component';

// room
import { RoomMasterComponent } from './room/room-master/room-master.component';

// member
import { MemberMasterComponent } from './team/member-master/member-master.component';
import { MemberAddDialogComponent } from './team/member-add-dialog/member-add-dialog.component';
import { MemberEditDialogComponent } from './team/member-edit-dialog/member-edit-dialog.component';

const routes: Routes = [
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: LogInComponent
    },
    {
        path: 'error/:code',
        component: ErrorComponent
    },
    {
        path: 'pandorabox',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login',
            },
            {
                path: 'logout',
                component: LogOutComponent
            },
            {
                path: 'console/:teamDomain',
                component: ConsoleMasterComponent
            },
            {
                path: 'dashboard/:teamDomain',
                component: DashboardMasterComponent
            },
            {
                path: 'room/:teamDomain',
                component: RoomMasterComponent
            },
            {
                path: 'ticket/:teamDomain',
                component: TicketMasterComponent
            }, {
                path: 'staff/:teamDomain',
                component: MemberMasterComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class PandoraBoxRoutingModule { }

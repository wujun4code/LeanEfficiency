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

// dashboard
import { DashboardMasterComponent } from './dashboard/dashboard-master/dashboard-master.component';

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
        path: 'pandorabox',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login',
            },
            {
                path: 'login',
                component: LogInComponent
            },
            {
                path: 'logout',
                component: LogOutComponent
            },
            {
                path: 'dashboard',
                component: DashboardMasterComponent
            },
            {
                path: 'room',
                component: RoomMasterComponent
            },
            {
                path: 'ticket',
                component: TicketMasterComponent
            }, {
                path: 'staff',
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

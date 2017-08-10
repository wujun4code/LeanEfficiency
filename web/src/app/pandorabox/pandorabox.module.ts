import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from '../material-components.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdIconRegistry } from "@angular/material";
import { CoreModule } from '../core/core.module';
import { PandoraBoxRoutingModule } from './pandorabox-routing.module';
// components
// root
import { PandoraBoxComponent } from './pandorabox.component'
// template
import { PbEditTemplateComponent } from './common/pb-edit-template/pb-edit-template.component';
// auth
import { SignUpComponent } from './auth/signup/signup.component';
import { LogInComponent } from './auth/login/login.component';
import { LogOutComponent } from './auth/logout/logout.component';
import { LayoutComponent, DemoDialog } from './layout/layout.component';

// dashboard
import { DashboardMasterComponent } from './dashboard/dashboard-master/dashboard-master.component';

// team
import { TeamAddQuickPanelComponent } from './team/team-add-quick-panel/team-add-quick-panel.component';
import { MemberFilterPanelComponent } from './team/member-filter-panel/member-filter-panel.component';
// room
import { RoomMasterComponent } from './room/room-master/room-master.component';

// ticket
import { TicketAddQuickPanelComponent } from './ticket/ticket-add-quick-panel/ticket-add-quick-panel.component';
import { TicketMasterComponent } from './ticket/ticket-master/ticket-master.component';

// member
import { MemberMasterComponent } from './team/member-master/member-master.component';
import { MemberAddDialogComponent } from './team/member-add-dialog/member-add-dialog.component';
import { MemberEditDialogComponent } from './team/member-edit-dialog/member-edit-dialog.component';
import { MemberPropertySelectDialogComponent } from './team/member-property-select-dialog/member-property-select-dialog.component';

export const components = [
    PandoraBoxComponent,
    PbEditTemplateComponent,
    SignUpComponent,
    LayoutComponent,
    DemoDialog,
    LogInComponent,
    LogOutComponent,
    DashboardMasterComponent,
    TeamAddQuickPanelComponent,
    RoomMasterComponent,
    TicketMasterComponent,
    TicketAddQuickPanelComponent,
    MemberMasterComponent,
    MemberAddDialogComponent,
    MemberEditDialogComponent,
    MemberFilterPanelComponent,
    MemberPropertySelectDialogComponent,
];

// services
import { services } from './services';

@NgModule({
    declarations: components,
    imports: [
        // UI
        TranslateModule, FlexLayoutModule, MaterialComponentsModule, CoreModule,
        // core
        HttpModule, CommonModule, FormsModule, ReactiveFormsModule, BrowserModule,
        // route
        PandoraBoxRoutingModule,
    ],
    entryComponents: components,
    providers: [
        MdIconRegistry,
        services
    ],
    bootstrap: [PandoraBoxComponent]
})
export class PandoraBoxModule { }
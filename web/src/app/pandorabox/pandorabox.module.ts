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
import { ChartModule } from 'angular2-highcharts'
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';;
declare var require: any;

export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}
import { PandoraBoxRoutingModule } from './pandorabox-routing.module';
// components

// root
import { PandoraBoxComponent } from './pandorabox.component'
// template
import { PbEditTemplateComponent } from './common/pb-edit-template/pb-edit-template.component';
import { PBDataTableComponent } from './common/pb-data-table/pb-data-table.component';

// auth
import { SignUpComponent } from './auth/signup/signup.component';
import { LogInComponent } from './auth/login/login.component';
import { LogOutComponent } from './auth/logout/logout.component';
import { LayoutComponent, LogOutDialog } from './layout/layout.component';

// dashboard
import { DashboardMasterComponent } from './dashboard/dashboard-master/dashboard-master.component';
import { DashboardLayoutV1Component } from './dashboard/dashboard-layout-v1/dashboard-layout-v1.component';
import { DailyReportRealTimeTableComponent } from './dashboard/daily-report-real-time-table/daily-report-real-time-table.component'

// team
import { TeamAddQuickPanelComponent } from './team/team-add-quick-panel/team-add-quick-panel.component';
import { MemberFilterPanelComponent } from './team/member-filter-panel/member-filter-panel.component';
import { TeamSwitchDialogComponent } from './team/team-switch-dialog/team-switch-dialog.component';


// room
import { RoomMasterComponent } from './room/room-master/room-master.component';
import { RoomRealTimeStatsComponent } from './room/room-real-time-stats/room-real-time-stats.component';

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
    PBDataTableComponent,
    SignUpComponent,
    LayoutComponent,
    LogOutDialog,
    LogInComponent,
    LogOutComponent,
    DashboardMasterComponent,
    DashboardLayoutV1Component,
    DailyReportRealTimeTableComponent,
    TeamAddQuickPanelComponent,
    RoomMasterComponent,
    RoomRealTimeStatsComponent,
    TeamSwitchDialogComponent,
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
        HttpModule, CommonModule, FormsModule, ReactiveFormsModule, BrowserModule, ChartModule,
        // route
        PandoraBoxRoutingModule,
    ],
    entryComponents: components,
    providers: [
        MdIconRegistry,
        services,
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }
    ],
    bootstrap: [PandoraBoxComponent]
})
export class PandoraBoxModule { }
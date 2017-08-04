import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardV1Component } from './custom-pages/dashboard-v1/dashboard-v1.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FormElementsComponent } from './forms/form-elements/form-elements.component';
import { ListsComponent } from './components/lists/lists.component';
import { WidgetComponent } from '../core/widgets/widgets-v1/widget-v1/widget-v1.component';
import { LineChartWidgetComponent } from '../core/widgets/widgets-v1/line-chart-widget/line-chart-widget.component';
import { SourceOverviewWidgetComponent } from '../core/widgets/widgets-v1/source-overview-widget/source-overview-widget.component';
import { SimpleTableComponent } from './tables/simple-table/simple-table.component';
import { FixedHeaderTableComponent } from './tables/fixed-header-table/fixed-header-table.component';
import { FormWizardComponent } from './forms/form-wizard/form-wizard.component';
import { GoogleMapsComponent } from './maps/google-maps/google-maps.component';
import { CardsComponent } from './components/cards/cards.component';
import { nvD3 } from '../core/charts/nvD3/nvD3.component';
import { DemoDialog, DialogsComponent } from './components/dialogs/dialogs.component';
import { IconsComponent } from './icons/icons.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { Level5Component } from './levels/level5/level5.component';
import { LoginComponent } from './custom-pages/login/login.component';
import { RegisterComponent } from './custom-pages/register/register.component';
import { ForgotPasswordComponent } from './custom-pages/forgot-password/forgot-password.component';
import { EditorComponent } from './editor/editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarChartComponent } from '../core/widgets/bar-chart/bar-chart.component';
import { LineChartComponent } from '../core/widgets/line-chart/line-chart.component';
import { RecentSalesComponent } from '../core/widgets/recent-sales/recent-sales.component';
import { PieChartComponent } from '../core/widgets/pie-chart/pie-chart.component';
import { GoogleMapsWidgetComponent } from '../core/widgets/google-maps-widget/google-maps-widget.component';
import { ActivityComponent } from '../core/widgets/activity/activity.component';
import { TrafficSourcesComponent } from '../core/widgets/traffic-sources/traffic-sources.component';
import { LoadingOverlayComponent } from '../core/loading-overlay/loading-overlay.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { InboxComponent } from './apps/inbox/inbox.component';
import { InboxComposeComponent } from './apps/inbox/inbox-compose/inbox-compose.component';
import { CalendarComponent } from './apps/calendar/calendar.component';
import { CalendarEditComponent } from './apps/calendar/calendar-edit/calendar-edit.component';
// import { ChatComponent } from './apps/chat/chat.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { environment } from "../../environments/environment";
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
import { D3ChartService } from '../core/charts/nvD3/nvD3.service';
import { MailService } from './apps/inbox/mail.service';
import { CalendarModule } from 'angular-calendar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from '../app-routing.module';
import { MaterialComponentsModule } from '../material-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { HighlightModule } from '../core/highlightjs/highlight.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { ChatModule } from './apps/chat/chat.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    TranslateModule,
    RoutingModule,
    ChatModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApi
    }),
    QuillModule,
    HighlightModule,
    SortablejsModule,
    CalendarModule.forRoot(),
    PerfectScrollbarModule.forChild(),
  ],
  entryComponents: [
    DemoDialog,
    InboxComposeComponent,
    CalendarEditComponent
  ],
  declarations: [
    DashboardV1Component,
    ButtonsComponent,
    FormElementsComponent,
    ListsComponent,
    WidgetComponent,
    LineChartWidgetComponent,
    SourceOverviewWidgetComponent,
    SimpleTableComponent,
    FixedHeaderTableComponent,
    FormWizardComponent,
    GoogleMapsComponent,
    CardsComponent,
    nvD3,
    DialogsComponent,
    DemoDialog,
    IconsComponent,
    GridListComponent,
    MenuComponent,
    SliderComponent,
    SnackBarComponent,
    TooltipComponent,
    Level5Component,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    EditorComponent,
    DashboardComponent,
    BarChartComponent,
    LineChartComponent,
    RecentSalesComponent,
    PieChartComponent,
    GoogleMapsWidgetComponent,
    ActivityComponent,
    TrafficSourcesComponent,
    LoadingOverlayComponent,
    DragAndDropComponent,
    InboxComponent,
    InboxComposeComponent,
    CalendarComponent,
    CalendarEditComponent,
    AutocompleteComponent
  ],
  providers: [
    D3ChartService,
    MailService,
  ]
})
export class DemoModule { }

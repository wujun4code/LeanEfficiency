import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from '../material-components.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '../core/core.module';
import { PandoraBoxRoutingModule } from './pandorabox-routing.module';
// components
import { PandoraBoxComponent } from './pandorabox.component'
import { LogInComponent } from './auth/login/login.component';

const components = [
    PandoraBoxComponent,
    LogInComponent
];

@NgModule({
    imports: [
        // UI
        TranslateModule, FlexLayoutModule, MaterialComponentsModule, CoreModule,
        // core
        HttpModule, CommonModule, FormsModule, ReactiveFormsModule, BrowserModule,
        // route
        PandoraBoxRoutingModule
    ],
    entryComponents: components,
    declarations: components
})
export class PandoraBoxModule { }
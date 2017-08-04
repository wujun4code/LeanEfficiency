import { NgModule } from '@angular/core';
import { ContactSearchDialog } from './contact/contact.component';
import { ChatComponent } from './chat.component';
import { MaterialComponentsModule } from '../../../material-components.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TextImage } from './text-img/text-img';

@NgModule({
    imports: [
        // UI
        TranslateModule, FlexLayoutModule, MaterialComponentsModule, PerfectScrollbarModule.forChild(),
        // core
        HttpModule, CommonModule, FormsModule, ReactiveFormsModule, BrowserModule
    ],
    entryComponents: [ChatComponent, ContactSearchDialog],
    declarations: [ChatComponent, ContactSearchDialog, TextImage]
})
export class ChatModule { }
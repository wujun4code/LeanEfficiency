import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// i18n
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

import { MaterialDesignModule } from './material-design';
import { FlexLayoutModule } from '@angular/flex-layout';

enableProdMode();

import { RxAVApp, RxAVClient } from 'rx-lean-js-core';
import { ngRxLeanCloud } from 'rx-lean-angular';


let app = new RxAVApp({
  appId: 'cfpwdlo41ujzbozw8iazd8ascbpoirt2q01c4adsrlntpvxr',
  appKey: 'lmar9d608v4qi8rvc53zqir106h0j6nnyms7brs9m082lnl7'
});

RxAVClient.init({
  plugins: {
    websocket: ngRxLeanCloud.ngWebSocketClient,
    storage: ngRxLeanCloud.ngStorage
  },
  log: true
}).add(app);

//providers & services
import { UserService, MessageService, TeamService, RoleService } from './services';

// ui components
import { TextImage } from './ui-components';

// pages
import { SignupComponent } from './signup/signup.component';
import { PartialTopNavComponent } from './partial-top-nav/partial-top-nav.component';
import { MessageComponent } from './message/message.component';
import { PartialMessageInputBoxComponent } from './partial-message-input-box/partial-message-input-box.component';
import { LoginComponent } from './login/login.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { LogOutComponent } from './log-out/log-out.component';
import { TeamListComponent } from './team-list/team-list.component';

// The translate loader needs to know where to load i18n files
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  entryComponents: [
    LogOutComponent
  ],
  declarations: [
    TextImage,
    AppComponent,
    SignupComponent,
    PartialTopNavComponent,
    MessageComponent,
    PartialMessageInputBoxComponent,
    LoginComponent,
    TeamCreateComponent,
    LogOutComponent,
    TeamListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialDesignModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [UserService, MessageService, AsyncPipe, TeamService, RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

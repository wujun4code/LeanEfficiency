import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

//providers & services
import { UserService, MessageService } from './services';

// ui components
import { SignupComponent } from './signup/signup.component';
import { PartialTopNavComponent } from './partial-top-nav/partial-top-nav.component';
import { MessageComponent } from './message/message.component';
import { PartialMessageInputBoxComponent } from './partial-message-input-box/partial-message-input-box.component';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PartialTopNavComponent,
    MessageComponent,
    PartialMessageInputBoxComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [UserService, MessageService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

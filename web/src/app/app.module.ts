import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { MdIconRegistry, } from "@angular/material";
import { RoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from './core/core.module';
import { DemoModule } from './demo/demo.module';
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
import { RxAVClient, RxAVApp } from 'rx-lean-js-core';
import { ngRxLeanCloud } from 'rx-lean-angular';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PandoraBoxModule } from './pandorabox/pandorabox.module';

enableProdMode();
const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  swipePropagation: false
};

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const sortablejsConfig: SortablejsOptions = {
  animation: 300
};
let app = new RxAVApp({
  appId: `1kz3x4fkhvo0ihk967hxdnlfk4etk754at9ciqspjmwidu1t`,
  appKey: `14t4wqop50t4rnq9e99j2b9cyg51o1232ppzzc1ia2u5e05e`
});

RxAVClient.init({
  plugins: {
    websocket: ngRxLeanCloud.ngWebSocketClient,
    storage: ngRxLeanCloud.ngStorage
  }
}).add(app);

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }),
    RoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    DemoModule,
    PandoraBoxModule,
    SortablejsModule,
    PerfectScrollbarModule.forRoot(perfectScrollbarConfig),
  ],
  providers: [
    MdIconRegistry,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

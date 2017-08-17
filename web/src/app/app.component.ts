import { Component, ViewEncapsulation } from '@angular/core';
import { MediaReplayService } from "./core/sidenav/mediareplay/media-replay.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(mediaReplayService: MediaReplayService, public translate: TranslateService) {
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('zh-cn');

    if (this.translate.getBrowserLang() !== undefined) {
      let locale = this.translate.getBrowserLang();
      console.log('locale', locale);
      this.translate.use(locale);
    } else {
      this.translate.use('zh-cn'); // Set your language here
    }
  }
}

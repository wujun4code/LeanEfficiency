import { Component, OnInit, ViewEncapsulation, Output, Input } from '@angular/core';
import { IUIChatModelListItemModel } from '../models';
import { UserService } from '../services';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { RxAVIMMessage } from 'rx-lean-js-core'

@Component({
  selector: 'app-partial-message-input-box',
  templateUrl: './partial-message-input-box.component.html',
  styleUrls: ['./partial-message-input-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PartialMessageInputBoxComponent implements OnInit {
  @Input()
  chat: IUIChatModelListItemModel;

  onSent: Subject<RxAVIMMessage>;
  constructor(public userService: UserService) {
    this.onSent = new Subject<RxAVIMMessage>();
  }

  ngOnInit() {
  }

  onEnter(event) {

    let value = event.target.value;
    console.log('value', value);

    this.sendText(value.toString()).subscribe(success => {
      if (success) {
        event.target.value = null;
      }
    });
  }

  send(fixContent: any) {
    if (this.chat) {
      console.log('fixContent', fixContent);
      return this.userService.realtime.send(this.chat.id, fixContent).map(message => {
        if (message instanceof RxAVIMMessage) {
          this.onSent.next(message);
          return true;
        }
      });
    }
  }
  sendText(value) {
    let textMessage = {
      type: 'text',
      text: value,
    };
    return this.send(textMessage);
    // console.log('textMessage', textMessage);
  }
}

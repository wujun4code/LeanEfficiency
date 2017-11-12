import { Component, OnInit, ViewEncapsulation, Output, Input } from '@angular/core';
import { IUIChatModelListItemModel } from '../models';

@Component({
  selector: 'app-partial-message-input-box',
  templateUrl: './partial-message-input-box.component.html',
  styleUrls: ['./partial-message-input-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PartialMessageInputBoxComponent implements OnInit {
  @Input()
  chat: IUIChatModelListItemModel;

  content: any;
  constructor() { }

  ngOnInit() {
  }

  onEnter(event) {

    let value = event.target.value;
    console.log('value', value);
  }

  send() {
    
  }

}

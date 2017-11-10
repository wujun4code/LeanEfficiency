import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, UserService } from '../services'
import { IUIChatModelListItemModel, ChatCategory, MessageModel } from '../models';
import { Observable } from 'rxjs';

export enum LayoutMode {
  Wechat = 1,
  Slack = 2
}
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {

  chats: Array<IUIChatModelListItemModel> = [];
  currentChat: IUIChatModelListItemModel;

  _layoutMode: LayoutMode = LayoutMode.Wechat;

  constructor(public messageService: MessageService, public userService: UserService) {
    this.chats = this.messageService.chats;
    if (this.chats.length > 0) {
      this.doSelect(this.chats[0])
    }
  }

  ngOnInit() {
    this._layoutMode = LayoutMode.Slack;
  }

  get layoutMode() {
    return this._layoutMode;
  }

  get isWechatMode() {
    return this.layoutMode == LayoutMode.Wechat;
  }
  get isSlackMode() {
    return this.layoutMode == LayoutMode.Slack;
  }

  isChannel(chat: IUIChatModelListItemModel) {
    return chat.category == ChatCategory.GroupChannel;
  }
  isDirect(chat: IUIChatModelListItemModel) {
    return chat.category == ChatCategory.Direct;
  }

  selected(chat: IUIChatModelListItemModel) {
    if (!this.currentChat) return false;
    return this.currentChat.id == chat.id;
  }

  onMessage: Observable<Array<MessageModel>>;

  doSelect(chat: IUIChatModelListItemModel) {
    if (this.selected(chat)) {
      return;
    }
    this.currentChat = chat;

    this.onMessage = this.messageService.loadMessageHistory(chat);
  }

  getMessageAvatar(message: MessageModel) {
    let no_avatar = 'assets/img/no-avatar.jpg';
    let user = this.userService.contact(message.senderId);
    return user ? user.avatar : no_avatar;
  }


}

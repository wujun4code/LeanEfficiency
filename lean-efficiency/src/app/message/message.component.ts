import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { MessageService, UserService, TeamService, RoleService } from '../services'
import { IUIChatModelListItemModel, ChatCategory, MessageModel, TeamModel, UserModel } from '../models';
import { Observable } from 'rxjs';
import { PartialMessageInputBoxComponent } from '../partial-message-input-box/partial-message-input-box.component';
import { RxAVIMMessage } from 'rx-lean-js-core';

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

  @ViewChild(PartialMessageInputBoxComponent) messageInputBox: PartialMessageInputBoxComponent;
  @ViewChild('messagePanel') private messagePanel: ElementRef;
  chats: Array<IUIChatModelListItemModel> = [];
  currentChat: IUIChatModelListItemModel;
  team: TeamModel;
  hexTeamName: string;
  hexConvName: string;
  _layoutMode: LayoutMode = LayoutMode.Wechat;

  onMessage: Observable<Array<MessageModel>>;

  currentMessages: Array<MessageModel> = [];

  constructor(public route: ActivatedRoute,
    public routeService: Router,
    public teamService: TeamService,
    public messageService: MessageService,
    public userService: UserService) {


    route.params.subscribe(params => {

      this.hexConvName = params['hexConvName'];
      this.hexTeamName = params['hexTeamName'];

      Observable.zip(this.userService.current(), this.teamService.go(this.hexTeamName)).flatMap(tupple => {
        let team = tupple[1];
        let user = tupple[0];
        return this.messageService.queryChannels(this.userService._currentUser, this.teamService._current);
      }).flatMap(chats => {
        this.chats = chats;
        this.currentChat = this.chats.find(c => c.hexName == this.hexConvName);
        return this.messageService.loadMessageHistory(this.currentChat);
      }).map(messages => {
        this.currentMessages = messages;
      }).subscribe(() => {
        this.userService.realtime.onMessage.filter(message => {
          return message.convId == this.currentChat.id;
        }).map(message => {
          this.whenNewMessageArrived(message);
        }).subscribe(() => { });
      });
    });


  }

  ngOnInit() {
    this._layoutMode = LayoutMode.Slack;

  }
  whenNewMessageArrived(message: RxAVIMMessage) {
    let messageModel = this.messageService.packMessage(message);
    this.currentMessages.push(messageModel);
    this.scrollToBottom();
  }
  ngAfterViewInit() {
    this.messageInputBox.onSent.map(sent => {
      this.whenNewMessageArrived(sent);
    }).subscribe(() => {

    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.messagePanel.nativeElement.scrollTop = this.messagePanel.nativeElement.scrollHeight;
    } catch (err) {
      console.log('err', err);
    }
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

  getMessageSenderName(message: MessageModel) {
    let user = this.userService.contact(message.senderId);
    if (user) {
      return user.nickName;
    }
    return message.senderId;
  }

  send() {

  }

}

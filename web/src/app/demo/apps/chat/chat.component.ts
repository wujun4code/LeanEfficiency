import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { chatDemoData } from "./chat.demo";
import * as _ from 'lodash';
import * as moment from 'moment';
import { fadeInAnimation } from "../../../route.animation";
import { PerfectScrollbarComponent } from "ngx-perfect-scrollbar";
import { RxAVRealtime, RxAVInstallation, RxAVUser } from 'rx-lean-js-core';
import { RxAVFriend, RxLeanCloudSocialUserExtention } from 'rx-lean-js-social';
import { MdDialogRef, MdDialog } from "@angular/material";
import { ContactSearchDialog } from './contact/contact.component';
import { Contact } from './chat.model';

@Component({
  selector: 'ms-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss', './text-img/text-img.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class ChatComponent implements OnInit {

  chats: any[];
  _currentUser: RxAVUser;
  contacts: Array<Contact> = [];
  activeChat: any;
  newMessage: string;
  contactSearchDialogRef: MdDialogRef<ContactSearchDialog>;
  @ViewChild('chatScroll') private chatScroll: PerfectScrollbarComponent;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    this.chats = _.sortBy(chatDemoData, 'lastMessageTime').reverse();
    this.activeChat = this.chats[0];
    RxAVUser.current().flatMap(currentUser => {
      this._currentUser = currentUser;
      return RxAVFriend.query(currentUser).find().map(list => {
        return list.map(f => RxAVFriend.createWithData(f));
      });
    }).subscribe(friends => {
      this.contacts = friends.map(f => {
        if (f.applicant.objectId == this._currentUser.objectId) {
          return f.respondent;
        } else return f.applicant;
      }).map(u => new Contact().fromAVUser(u)) || [];

      RxAVFriend.startListen().subscribe(started => {
        console.log('stated listening...', started);
        RxAVFriend.onApproved.subscribe(apporved => {
          console.log('apporved');
          if (apporved instanceof RxAVFriend) {
            
          }
        });
      });
    });
  }

  setActiveChat(chat) {
    this.activeChat = chat;
  }

  send() {
    if (this.newMessage) {
      this.chats[0].messages.push({
        message: this.newMessage,
        when: moment(),
        who: 'me'
      });

      this.newMessage = '';
    }
  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }

  openContactSearchDialog(event) {
    this.contactSearchDialogRef = this.dialog.open(ContactSearchDialog, {
      disableClose: false,
      height: '480px',
      width: '600px',
      hasBackdrop: true
    });

    this.contactSearchDialogRef.afterClosed().subscribe(result => {
      this.contactSearchDialogRef = null;
    });
  }
}


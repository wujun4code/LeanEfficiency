import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUIChatModelListItemModel, ChatCategory, DirectChatModel, GroupChannelModel, MessageModel } from '../models'
import { UserService } from './user-service';

@Injectable()
export class MessageService {
    _chats: Array<IUIChatModelListItemModel>;

    constructor(public userService: UserService) {
        this._chats = [];

        this.initMockData();
    }

    initMockData() {

        let gc1 = new GroupChannelModel();
        gc1.id = 'gc1';
        gc1.avatar = 'assets/img/LeanCloud-Avatar.svg';
        gc1.lastMessageSummary = '江宏: [图片]';
        gc1.name = '_LeanCloud';
        gc1.subUrl = '_LeanCloud';

        let gc2 = new GroupChannelModel();
        gc2.id = 'gc2';
        gc2.avatar = 'assets/img/android.png';
        gc2.lastMessageSummary = '俊文: 这个 bug 好像我们的 sdk 都会有';
        gc2.name = 'Android SDK';
        gc2.subUrl = 'Android_SDK';

        let gc3 = new GroupChannelModel();
        gc3.id = 'gc3';
        gc3.avatar = 'assets/img/iphone.png';
        gc3.lastMessageSummary = 'ttang: 昨天发布了新版，应该修复了这个问题';
        gc3.name = 'iOS SDK';
        gc3.subUrl = 'iOS_SDK';

        let dc1 = new DirectChatModel();
        dc1.convId = 'dc1';
        dc1.avatar = 'assets/img/wchen.png';
        dc1.lastMessageSummary = '兹瓷';
        dc1.hexPeerId = 'wchen';
        dc1.name = this.userService.contact(dc1.hexPeerId).textName;

        let dc2 = new DirectChatModel();
        dc2.convId = 'dc2';
        dc2.avatar = 'assets/img/hjiang.png';
        dc2.lastMessageSummary = '老板，啥时候出去玩呀';
        dc2.hexPeerId = 'hjiang';
        dc2.textName = this.userService.contact(dc2.hexPeerId).textName;

        let dc3 = new DirectChatModel();
        dc3.convId = 'dc3';
        dc3.avatar = 'assets/img/ttang.png';
        dc3.lastMessageSummary = '稍等，正在修复这个问题';
        dc3.hexPeerId = 'ttang';
        dc3.name = this.userService.contact(dc3.hexPeerId).textName;

        this._chats.push(gc1, dc1, gc2, dc2, dc3, gc3);

    }
    get chats() {
        return this._chats;
    }

    findChat(chatId: any) {
        if (typeof chatId == 'string') {
            return this.chats.find(chat => chat.id.toLowerCase() == chatId.toLowerCase() || chat.subUrl.toLowerCase() == chatId.toLowerCase());
        }
        return undefined;
    }

    loadMessageHistory(chat: IUIChatModelListItemModel): Observable<Array<MessageModel>> {
        let words = ['好的，马上发布', '可能有个 bug，我看下代码，稍等', '这个不好说', '用户那边有问题'];
        let messages: Array<MessageModel> = [];
        for (let i = 0; i < 10; i++) {
            let msg = new MessageModel();
            if (chat instanceof DirectChatModel) {
                msg.senderId = chat.hexPeerId;
                msg.content = words[i % 4];
                let peer = this.userService.contact(chat.hexPeerId);
                msg.senderName = peer.textName;
            } else if (chat instanceof GroupChannelModel) {
                msg.senderId = 'junwu';
                msg.content = words[i % 4];
                msg.senderName = 'junwu';
            }
            messages.push(msg);
        }

        return Observable.from([messages]);

    }
}
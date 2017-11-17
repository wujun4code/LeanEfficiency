import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUIChatModelListItemModel, ChatCategory, DirectChatModel, GroupChannelModel, MessageModel } from '../models'
import { UserService } from './user-service';

import { UserModel } from '../models/user-model';
import { TeamModel } from '../models/team-model';
import { RxAVQuery, RxAVObject, RxAVIMHistoryIterator, RxAVIMMessage } from 'rx-lean-js-core';
import { Relation_Team_Conversation, Relation_User_Conversation } from '../models/relation-models';


@Injectable()
export class MessageService {
    _chats: Array<IUIChatModelListItemModel>;

    constructor(public userService: UserService) {
        this._chats = [];

        //this.initMockData();

    }
    initChannelList(user: UserModel, team: TeamModel) {
        return this.queryChannels(user, team).map(channels => {
            this._chats.push(...channels);
            return this.chats;
        });
    }
    initMockData() {

        let gc1 = new GroupChannelModel();
        gc1.id = 'gc1';
        gc1.avatar = 'assets/img/LeanCloud-Avatar.svg';
        gc1.lastMessageSummary = '江宏: [图片]';
        gc1.name = '_LeanCloud';
        gc1.hexName = '_LeanCloud';

        let gc2 = new GroupChannelModel();
        gc2.id = 'gc2';
        gc2.avatar = 'assets/img/android.png';
        gc2.lastMessageSummary = '俊文: 这个 bug 好像我们的 sdk 都会有';
        gc2.name = 'Android SDK';
        gc2.hexName = 'Android_SDK';

        let gc3 = new GroupChannelModel();
        gc3.id = 'gc3';
        gc3.avatar = 'assets/img/iphone.png';
        gc3.lastMessageSummary = 'ttang: 昨天发布了新版，应该修复了这个问题';
        gc3.name = 'iOS SDK';
        gc3.hexName = 'iOS_SDK';

        let dc1 = new DirectChatModel();
        dc1.convId = 'dc1';
        dc1.avatar = 'assets/img/wchen.png';
        dc1.lastMessageSummary = '兹瓷';
        dc1.hexPeerId = 'wchen';
        dc1.name = this.userService.contact(dc1.hexPeerId).nickName;

        let dc2 = new DirectChatModel();
        dc2.convId = 'dc2';
        dc2.avatar = 'assets/img/hjiang.png';
        dc2.lastMessageSummary = '老板，啥时候出去玩呀';
        dc2.hexPeerId = 'hjiang';
        dc2.textName = this.userService.contact(dc2.hexPeerId).nickName;

        let dc3 = new DirectChatModel();
        dc3.convId = 'dc3';
        dc3.avatar = 'assets/img/ttang.png';
        dc3.lastMessageSummary = '稍等，正在修复这个问题';
        dc3.hexPeerId = 'ttang';
        dc3.name = this.userService.contact(dc3.hexPeerId).nickName;

        this._chats.push(gc1, dc1, gc2, dc2, dc3, gc3);

    }
    get chats() {
        return this._chats;
    }
    findChat(chatId: any) {
        if (typeof chatId == 'string') {
            return this.chats.find(chat => chat.id.toLowerCase() == chatId.toLowerCase() || chat.hexName.toLowerCase() == chatId.toLowerCase());
        }
        return undefined;
    }

    queryChannels(user: UserModel, team: TeamModel) {
        let query = new RxAVQuery(Relation_User_Conversation.className);
        query.equalTo(Relation_User_Conversation.keys.user, user.metaData);
        query.equalTo(Relation_User_Conversation.keys.team, team.metaData);
        query.include(Relation_User_Conversation.keys.conversation);
        return query.find().map(team_conv_users => {
            let channels = team_conv_users.map(item => {
                let channel = new GroupChannelModel();
                let chatMetaData = item.get(Relation_Team_Conversation.keys.conversation) as RxAVObject;
                channel.id = ((item.get('conv') as RxAVObject).get(Relation_Team_Conversation.keys.conversation) as RxAVObject).objectId;

                channel.avatar = 'assets/img/LeanCloud-Avatar.svg';
                channel.nameHex = chatMetaData.get('hexName');
                channel.name = chatMetaData.get('name');
                channel.hexName = chatMetaData.get('hexName');
                return channel;
            });
            return channels;
        });
    }

    loadMessageHistory(chat: IUIChatModelListItemModel): Observable<Array<MessageModel>> {
        let history = this.userService.realtime.history(chat.id);

        return history.previous(true).map(avMessages => {
            return avMessages.map(av => {
                return this.packMessage(av);
            });
        });
    }

    packMessage(metaMessage: RxAVIMMessage) {
        let message = new MessageModel();
        message.id = metaMessage.id;
        message.senderId = metaMessage.from;
        let messageJson = metaMessage.toJson();
        if (Object.prototype.hasOwnProperty.call(messageJson, 'type')) {
            let mType = messageJson['type'];
            switch (mType) {
                case 'text': {
                    message.content = messageJson['text'];
                    break;
                }
                default: {
                    message.content = metaMessage.content;
                }
            }
        }
        return message;
    }
}
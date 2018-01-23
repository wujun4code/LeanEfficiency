import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RxAVUser, RxAVQuery, RxAVObject } from 'rx-lean-js-core';
import { RxAVRealtime, RxAVIMExtGroupChat, RxAVIMConversation } from 'rx-lean-js-core';
import { UserModel, InvitationTokenConfig, UserFields, GroupChannelModel, Relation_Team_Conversation, Relation_User_Conversation } from '../models';
import { TeamModel } from '../models/team-model';


@Injectable()
export class UserService {
    _mockContacts: Array<UserModel> = [];
    _currentUser: UserModel;
    realtime: RxAVRealtime;
    constructor() {
        this.initMockData();
        this.realtime = new RxAVRealtime();
    }
    public current(): Observable<UserModel> {
        if (this._currentUser) {
            return Observable.from([this._currentUser]);
        }
        return RxAVUser.current().flatMap(userMetaData => {
            if (userMetaData) {
                this._currentUser = new UserModel();
                this._currentUser.restoreFromAVUser(userMetaData);
                return this.connect(this._currentUser).map(connected => {
                    return this._currentUser;
                });
            }
            return Observable.from([undefined]);
        });
    }

    get devUser(): UserModel {
        let junwu = new UserModel();
        junwu.avatar = 'assets/img/junwu.png';
        junwu.clientId = 'junwu';
        junwu.email = 'jun.wu@leancloud.rocks';
        junwu.id = 'xxx';
        junwu.mobile = '18612438929';
        junwu.hexName = 'junwu';
        junwu.nickName = '吴骏';
        return junwu;
    }


    initMockData() {
        let current = this.devUser;

        let wchen = new UserModel();
        wchen.avatar = 'assets/img/wchen.png';
        wchen.clientId = 'wchen';
        wchen.email = 'wchen@leancloud.rocks';
        wchen.id = '111';
        wchen.hexName = 'wchen';
        wchen.mobile = '15658580412';
        wchen.nickName = '陈伟';

        let hjiang = new UserModel();
        hjiang.avatar = 'assets/img/hjiang.png';
        hjiang.clientId = 'hjiang';
        hjiang.email = 'hjiang@leancloud.rocks';
        hjiang.id = '222';
        hjiang.hexName = 'hjiang';
        hjiang.mobile = '13812345678';
        hjiang.nickName = '江宏';

        let ttang = new UserModel();
        ttang.avatar = 'assets/img/ttang.png';
        ttang.clientId = 'ttang';
        ttang.email = 'ttang@leancloud.rocks';
        ttang.id = '333';
        ttang.mobile = '18888888888';
        ttang.hexName = 'ttang';
        ttang.nickName = '唐天勇';

        this._mockContacts.push(current, wchen, hjiang, ttang);
    }

    get mockContacts() {
        return this._mockContacts;
    }

    setCurrentUser(userMetaData: RxAVUser) {
        let userModel = new UserModel();
        userModel.restoreFromAVUser(userMetaData);
        this._currentUser = userModel;
        return userModel;
    }

    contact(userId: string) {
        return this.mockContacts.find(user => user.id == userId || user.hexName == userId || user.clientId == userId);
    }

    queryInvitationToken(invitationToken: string) {
        let query = new RxAVQuery(InvitationTokenConfig.className);
        query.equalTo(InvitationTokenConfig.keys.token, invitationToken);
        return query.seek();
    }
    create(username: string,
        password: string,
        nickName: string,
        hexName: string,
        email: string,
        mobile?: string
    ) {
        let user = new RxAVUser();
        user.username = username;
        user.password = password;
        user.email = email;
        if (mobile) {
            user.mobilephone = mobile;
        }
        user.set(UserFields.keys.nickName, nickName);
        user.set(UserFields.keys.hexName, hexName);
        return user.signUp().map(signuped => {
            return this.setCurrentUser(user);
        });
    }

    logIn(credentials: {
        password: string,
        username?: string,
        mobile?: string,
        email?: string
    }) {
        let logAction = RxAVUser.logIn(credentials.username, credentials.password);
        // if (credentials.mobile) {

        // }
        return logAction.map(user => {
            return this.setCurrentUser(user);
        });
    }

    connect(user: UserModel) {
        return this.realtime.connect(user.username);
    }

    createGroupChat(team: TeamModel, hexName: string, name: string, unique: boolean, members?: UserModel[], bulltetin?: string, topic?: string) {

        let groupChat = new RxAVIMExtGroupChat();
        groupChat.set('hexName', hexName.toLocaleLowerCase());
        groupChat.set('name', name);
        groupChat.set('admins', [this._currentUser.username]);
        let tunnel = new RxAVIMConversation();
        tunnel.unique = unique;
        groupChat.tunnel = tunnel;

        if (members) {
            tunnel.members = members.map(m => m.clientId);
        }

        return this.realtime.create(tunnel).flatMap(convCreated => {
            let team_conv = new RxAVObject(Relation_Team_Conversation.className);
            team_conv.set(Relation_Team_Conversation.keys.conversation, groupChat);
            team_conv.set(Relation_Team_Conversation.keys.team, team.metaData);
            if (hexName == 'general') {
                team_conv.set(Relation_Team_Conversation.keys.category, 'general');
                team_conv.set(Relation_Team_Conversation.keys.scope, 'all');
            }
            //team_conv.set(Relation_Team_Conversation.keys.user, this._currentUser.metaData);
            return team_conv.save();
        }).flatMap(teamRelated => {
            if (!members) {
                members = [this._currentUser];
            } else {
                if (!members.find(u => u.id == this._currentUser.id)) {
                    members.push(this._currentUser);
                }
            }
            let executers = members.map(m => {
                let user_conv = new RxAVObject(Relation_User_Conversation.className);
                user_conv.set(Relation_User_Conversation.keys.conversation, groupChat);
                user_conv.set(Relation_User_Conversation.keys.user, m.metaData);
                user_conv.set(Relation_User_Conversation.keys.team, team.metaData);
                return user_conv.save();
            });
            let rtn = Observable.merge(...executers);
            return rtn;
        });
    }

    createGeneral(team: TeamModel) {
        return this.createGroupChat(team, 'general', '所有人', true);
    }

    fixUserRelationGroupChat(channel: RxAVIMExtGroupChat, user: UserModel, team: TeamModel) {
        let user_conv = new RxAVObject(Relation_User_Conversation.className);
        user_conv.set(Relation_User_Conversation.keys.conversation, channel);
        user_conv.set(Relation_User_Conversation.keys.user, user.metaData);
        user_conv.set(Relation_User_Conversation.keys.team, team.metaData);
        return user_conv.save();
    }

    join(user: UserModel, groupChat: RxAVIMExtGroupChat, team: TeamModel) {
        let clientId = user.clientId;
        let conversationId = groupChat.tunnel.id;
        let groupChatObject = groupChat;
        return this.realtime.add(conversationId, [clientId]).flatMap(joined => {
            return this.fixUserRelationGroupChat(groupChatObject, user, team);
        });
    }

    joinGeneral(team: TeamModel, user: UserModel) {
        let query = new RxAVQuery(Relation_Team_Conversation.className);
        query.equalTo(Relation_Team_Conversation.keys.team, team.metaData);
        query.equalTo(Relation_Team_Conversation.keys.category, Relation_Team_Conversation.generalCategory);
        query.include(Relation_Team_Conversation.keys.conversation);
        let conversationProperty: RxAVObject;
        return query.find().flatMap(convs => {
            if (convs.length > 0) {
                let conv = convs[0];
                conversationProperty = conv.get(Relation_Team_Conversation.keys.conversation) as RxAVObject;
                let convId = (conversationProperty.get('tunnel') as RxAVObject).objectId;
                return this.realtime.add(convId, [user.clientId]);
            }
            else {
                return Observable.from([false]);
            }
        }).flatMap(joined => {
            if (joined) {
                return this.relateUserTeamConv(team, user, conversationProperty);
            } else {
                return Observable.from([false]);
            }
        });
    }

    relateUserTeamConv(team: TeamModel, user: UserModel, conv: RxAVObject) {
        let team_user_conv = new RxAVObject(Relation_User_Conversation.className);
        team_user_conv.set(Relation_User_Conversation.keys.conversation, conv);
        team_user_conv.set(Relation_User_Conversation.keys.team, team.metaData);
        team_user_conv.set(Relation_User_Conversation.keys.user, user.metaData);
        return team_user_conv.save();
    }

    list() {
        let query = new RxAVQuery('_User');
        return query.find().map(users => {
            return users.map(u => {
                let userMetaData = u as RxAVUser;
                let userModel = new UserModel();
                userModel.restoreFromAVUser(userMetaData);
                return userModel;
            });
        });
    }

    logOut() {
        return this.realtime.close().flatMap(wsClosed => {
            return this.current();
        }).flatMap(user => {
            this._currentUser = undefined;
            return user.metaData.logOut();
        });
    }
}
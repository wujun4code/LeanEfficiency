import { RxAVUser } from 'rx-lean-js-core';
import { RxAVFriend, RxLeanCloudSocialUserExtention } from 'rx-lean-js-social';

export class Chat {
  picture: string;
  name: string;
  messages: any[];

  constructor(model: any = null) {
    this.picture = model.picture;
    this.name = model.name;
    this.messages = model.messages;
  }
}

export class Contact {
  nickName: string;
  username: string;
  email: string;
  mobile: string;
  id: string;
  objectId: string;
  constructor() {
  }
  fromAVUser(user: RxAVUser) {
    this.nickName = user.get(RxLeanCloudSocialUserExtention.nickNameKey) || '';
    this.username = user.username;
    this.email = user.email || '';
    this.mobile = user.mobilephone || '';
    this.objectId = user.objectId;
    return this;
  }
}
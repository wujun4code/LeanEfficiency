import { RxAVUser } from 'rx-lean-js-core';
import { BaseModel } from './base-model';

export class UserModel extends BaseModel {
    constructor() {
        let user = new RxAVUser();
        super(user);
    }
    /**
     * _User 的 objectId
     * 
     * @type {string}
     * @memberof UserModel
     */
    id: string;

    metaData: RxAVUser;

    /**
     * 在整个聊天系统里面的 client id，为什么要区别与 id 呢？因为这个值可能会是 id 也可能是用户自己输入的全系统唯一的用户名，谁知道呢？
     * 
     * @type {string}
     * @memberof UserModel
     */
    clientId: string;

    /**
     * 被 @ 的时候需要输入的 hex 格式的字符串 id
     * 
     * @type {string}
     * @memberof UserModel
     */
    hexName: string;

    /**
     * _User 表对应的 username 字段
     * 
     * @type {string}
     * @memberof UserModel
     */
    username: string;

    /**
     * 用户给自己标记的昵称，类似于 QQ 昵称
     * 
     * @type {string}
     * @memberof UserModel
     */
    nickName: string;

    email: string;
    mobile: string;
    avatar: string;

    restoreFromAVUser(userMetaData: RxAVUser) {
        this.metaData = userMetaData;
        this.id = userMetaData.objectId;
        this.nickName = userMetaData.get(UserFields.keys.nickName);
        this.email = userMetaData.email;
        this.mobile = userMetaData.mobilephone;
        this.username = userMetaData.username;
        this.clientId = userMetaData.username;
        this.hexName = userMetaData.get(UserFields.keys.hexName);
    }
}

export const UserFields = {
    className: '_User',
    keys: {
        nickName: 'nickName',
        hexName: 'hexName'
    }
};
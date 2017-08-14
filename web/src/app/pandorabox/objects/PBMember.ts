import { PBObject } from './PBObject';
import { Observable } from 'rxjs';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

import { PBRole } from './PBRole';
import { PBUser } from './PBUser';
import { PBTeamUserFields } from './PBTeamUser';
const _hasOwnProperty = Object.prototype.hasOwnProperty;
export const has = function (obj: any, prop: any) {
    return _hasOwnProperty.call(obj, prop);
};
export class PBMember extends PBObject {
    constructor(memberObj: RxAVObject) {
        super(memberObj);
    }

    _user: PBUser;

    get linkUser(): PBUser {
        if (this._user == undefined)
            this._user = new PBUser(this.user);
        return this._user;
    }
    get user() {
        return this.metaData.get(PBTeamUserFields.user);
    }

    get mobile() {
        return this.linkUser.metaUser.mobilephone;
    }

    get serial() {
        return this.metaData.get(PBTeamUserFields.serial);
    }

    get nickName() {
        return this.linkUser.metaUser.get('nickName');
    }

    get weixin() {
        return this.linkUser.metaUser.get('weixin');
    }

    getValue(key) {
        if (key == 'nickName') {
            return this.nickName;
        } else if (key == 'serial') {
            return this.serial;
        } else if (key == 'weixin') {
            return this.weixin;
        } else if (key == 'mobile') {
            return this.mobile;
        } else if (has(this.metaData.estimatedData, key)) {
            return this.metaData.get(key);
        } else if (has(this.linkUser.metaUser.estimatedData, key)) {
            return this.linkUser.metaUser.get(key);
        }
    }
}

export const PBMemberBuiltInProperties = {
    className: 'PBProperty',
    objectName: 'objectName',
    id: 'objectId',
    propertyName: 'propertyName',
    description: 'description',
    propertyType: 'propertyType',
    placeholder: 'placeholder',
    category: 'category',
    subCategory: 'subCategory',
    icon: 'icon',
    scope: 'scope',
    team: 'team',
    valid: 'valid'
};

export const PBMemberBuiltInFreezeProperties = ['serial', 'id', 'objectId'];

export const PBMemberKeys = {
    technician: 'technician',
    reception: 'reception'
};
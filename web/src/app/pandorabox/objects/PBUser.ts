import { PBObject } from './PBObject';
import { RxAVUser, RxAVACL } from 'rx-lean-js-core';

export class PBUser {
    metaUser: RxAVUser;
    constructor(user: RxAVUser) {
        this.metaUser = user;
    }

    get nameText() {
        return this.metaUser.username;
    }

    get acl() {
        let acl_obj = new RxAVACL();
        acl_obj.setPublicReadAccess(false);
        acl_obj.setPublicWriteAccess(false);
        acl_obj.setWriteAccess(this.metaUser, true);
        acl_obj.setRoleWriteAccess('sa', true);
        return acl_obj;
    }
}

export const PBUserFields = {
    name: 'name',
};
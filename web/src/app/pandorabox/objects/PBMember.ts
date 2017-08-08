import { PBObject } from './PBObject';
import { Observable } from 'rxjs';
import { PBRole } from './PBRole';
import { PBUser } from './PBUser';
import { PBTeamUserFields } from './PBTeamUser';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

export class PBMember extends PBObject {
    constructor(memberObj: RxAVObject) {
        super(memberObj);
    }
}

export const PBMemberBuiltInProperties = {
    className: 'PBProperty',
    objectName: 'objectName',
    propertyName: 'propertyName',
    description: 'description',
    propertyType: 'propertyType',
    placeholder: 'placeholder',
    category: 'category',
    subCategory: 'subCategory',
    scope: 'scope',
    team: 'team',
    valid: 'valid'
};

export const PBMemberKeys = {
    technician: 'technician',
    reception: 'reception'
};
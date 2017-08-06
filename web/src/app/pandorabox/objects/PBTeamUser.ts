import { PBObject } from './PBObject';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

export class PBTeamUser extends PBObject {
    constructor(team_user: RxAVObject) {
        super(team_user);
    }
}

export const PBTeamUserFields = {
    className: 'PBTeamUser',
    user: 'user',
    team: 'team',
    roles: 'roles',
}
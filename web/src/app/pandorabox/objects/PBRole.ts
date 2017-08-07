import { RxAVObject, RxAVRole } from 'rx-lean-js-core';
import { Observable } from 'rxjs';
import { PBUser } from './PBUser';
import { PBTeam } from './PBTeam';

export class PBRole {
    metaRole: RxAVRole;
    constructor(_metaRole: RxAVRole) {
        this.metaRole = _metaRole;
    }

    grant(user: PBUser) {
        return this.metaRole.grant(user.metaUser);
    }
}

export class PBBoss extends PBRole {
    constructor(bossRole: RxAVRole) {
        super(bossRole);
    }
}
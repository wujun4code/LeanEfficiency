import { PBObject } from './PBObject';
import { Observable } from 'rxjs';
import { PBRole } from './PBRole';
import { PBUser } from './PBUser';
import { PBTeamUserFields } from './PBTeamUser';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

export class PBTeam extends PBObject {
    constructor(teamObj: RxAVObject) {
        super(teamObj);
    }

    get serial() {
        return this.metaData.get(PBTeamFields.id) || '';
    }

    get name() {
        return this.metaData.get(PBTeamFields.name) || '';
    }

    get domain() {
        return this.metaData.get(PBTeamFields.domain) || '';
    }

    get friendly() {
        return this.metaData.get(PBTeamFields.friendly) || '';
    }

    get shortName() {
        return `${this.friendly}(${this.serial})`;
    }

    get location() {
        return this.metaData.get(PBTeamFields.location) || '';
    }

    get bossRoleName() {
        return `${this.domain}_boss`;
    }

    get teamACL() {
        let teamACL = new RxAVACL();
        teamACL.setPublicReadAccess(false);
        teamACL.setPublicWriteAccess(false);

        teamACL.setRoleReadAccess(this.domain, true);
        teamACL.setRoleWriteAccess(this.domain, true);
        return teamACL;
    }

    get teamSAACL() {
        let teamSARoleName = `${this.domain}_sa`;
        let teamSAACL = new RxAVACL();
        teamSAACL.setPublicReadAccess(false);
        teamSAACL.setPublicWriteAccess(false);

        teamSAACL.setRoleReadAccess(teamSARoleName, true);
        teamSAACL.setRoleWriteAccess(teamSARoleName, true);
        return teamSAACL;
    }

    get teamBossACL() {
        let teamSARoleName = `${this.domain}_boss`;
        let teamBossACL = new RxAVACL();
        teamBossACL.setPublicReadAccess(false);
        teamBossACL.setPublicWriteAccess(false);

        teamBossACL.setRoleReadAccess(teamSARoleName, true);
        teamBossACL.setRoleWriteAccess(teamSARoleName, true);
        return teamBossACL;
    }

    addMember(user: PBUser, roles: Array<PBRole>) {
        let team_user_relation_obj = new RxAVObject(PBTeamUserFields.className);

        team_user_relation_obj.set(PBTeamUserFields.user, user.metaUser);
        team_user_relation_obj.set(PBTeamUserFields.team, this.metaData);
        team_user_relation_obj.set(PBTeamUserFields.roles, roles.map(r => r.metaRole.name));

        team_user_relation_obj.ACL = this.teamACL;

        return team_user_relation_obj.save().flatMap(added => {
            let grant = roles.map(r => r.grant(user));
            return Observable.merge(...grant);
        });
    }

    assign(user: PBUser, role: PBRole) {

        let team_user_relation_query = new RxAVQuery(PBTeamUserFields.className);
        team_user_relation_query.equalTo(PBTeamUserFields.team, this.metaData);
        team_user_relation_query.equalTo(PBTeamUserFields.user, user.metaUser);

        return team_user_relation_query.find().flatMap(list => {
            if (list.length > 0) {
                let team_user_relation_obj = list[0];
                team_user_relation_obj.addUnique(PBTeamUserFields.roles, role.metaRole.name);
                return team_user_relation_obj.save().flatMap(added => {
                    return role.grant(user);
                });
            }
            return this.addMember(user, [role]);
        });
    }
}

export const PBTeamFields = {
    className: 'PBTeam',
    name: 'name',
    domain: 'domain',
    serial: 'serial',
    paymentType: 'paymentType',
    id: 'id',
    grade: 'grade',
    friendly: 'friendly',
    owner: 'owner',
    model: 'model',
    location: 'location'
}
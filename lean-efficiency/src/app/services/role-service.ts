import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RxAVUser, RxAVQuery, RxAVRole, RxAVACL } from 'rx-lean-js-core';

import { UserModel, InvitationTokenConfig, UserFields, TeamModel, TeamFields, RoleModel } from '../models';

@Injectable()
export class RoleService {
    queryUsersInRole(team: TeamModel | string, role: RoleModel | string) {

    }

    grant(team: TeamModel | string, role: RoleModel | string) {
        let _team = new TeamModel();
        if (typeof team == 'string') {
            _team.id = team;
        } else if (team instanceof TeamModel) {
            _team = team;
        }
        let _role = new RoleModel();
        if (typeof role == 'string') {
            _role.id = role;
        } else if (role instanceof RoleModel) {
            _role = role;
        }

    }

    createTeamAdmin(team: TeamModel, admin: UserModel) {
        let adminRoleName = team.adminRoleName;
        let role = new RxAVRole(adminRoleName);

        role.ACL = team.teamAdminACL;
        role.ACL.setWriteAccess(admin.id, true);
        return role.save().flatMap(roleCreated => {
            return role.grant(admin.metaData);
        });
    }
}
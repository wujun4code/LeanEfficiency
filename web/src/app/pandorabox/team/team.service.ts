import { Injectable } from '@angular/core';
import { RxAVUser, RxAVQuery, RxAVObject, RxAVRole, RxAVACL } from 'rx-lean-js-core';
import { Observable } from 'rxjs';
import { PBTeam, PBTeamFields, PBPaymentTypeFields, PBPaymentType, PBUser, PBRole, PBBoss } from '../objects';

@Injectable()
export class DefaultTeamService {

    fetchPaymentType(): Observable<Array<PBPaymentType>> {
        let query = new RxAVQuery(PBPaymentTypeFields.className);
        query.notEqualTo(PBPaymentTypeFields.valid, false);
        return query.find().map(list => {
            return list.map(p => new PBPaymentType(p));
        });
    }

    createTeam(name: string, domain: string, paymentType: PBPaymentType) {
        
        let team_obj = new RxAVObject(PBTeamFields.className);
        team_obj.set(PBTeamFields.name, name);
        team_obj.set(PBTeamFields.domain, domain);
        team_obj.set(PBTeamFields.paymentType, paymentType.metaData);
        return team_obj.save().map(created => {
            return new PBTeam(team_obj);
        });
    }

    createBossRole(boss: PBUser, team: PBTeam) {
        let team_boss_name = `${team.domain}_boss`;
        let team_boss_role = new RxAVRole();

        team_boss_role.name = team_boss_name;
        team_boss_role.ACL = boss.acl;

        return team_boss_role.save().map(created => {
            return new PBBoss(team_boss_role);
        });
    }

    createRole(team: PBTeam) {
        let roleName = team.name;
        let role = new RxAVRole();
        role.name = roleName;

        let roleACL = new RxAVACL();
        roleACL.setPublicWriteAccess(false);
        roleACL.setRoleWriteAccess('sa', true);

        role.ACL = roleACL;
        return role.save().map(created => {
            return role;
        });
    }

    addMember(user: PBUser, role: PBRole) {

    }



}
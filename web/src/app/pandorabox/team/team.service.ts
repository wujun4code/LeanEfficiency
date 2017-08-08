import { Injectable } from '@angular/core';
import { RxAVUser, RxAVQuery, RxAVObject, RxAVRole, RxAVACL } from 'rx-lean-js-core';
import { Observable } from 'rxjs';
import { PBTeam, PBTeamFields, PBPaymentTypeFields, PBPaymentType, PBUser, PBRole, PBBoss, PBStaff, PBMemberBuiltInProperties } from '../objects';

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
        let team_boss_role = new RxAVRole();

        team_boss_role.name = team.bossRoleName;
        team_boss_role.ACL = boss.acl;

        return team_boss_role.save().map(created => {
            return new PBBoss(team_boss_role);
        });
    }

    createRole(team: PBTeam) {
        let roleName = team.domain;
        let role = new RxAVRole();
        role.name = roleName;

        let roleACL = new RxAVACL();
        roleACL.setPublicWriteAccess(false);
        roleACL.setRoleWriteAccess('sa', true);
        roleACL.setRoleWriteAccess(team.bossRoleName, true);

        role.ACL = roleACL;
        return role.save().map(created => {
            return new PBStaff(role);
        });
    }

    getMemberFields(subCategory?: string, team?: PBTeam) {
        let sc = subCategory ? `member-${subCategory}` : 'member';
        let builtInRoleQuery = new RxAVQuery(PBMemberBuiltInProperties.className);
        builtInRoleQuery.equalTo(PBMemberBuiltInProperties.subCategory, sc);

        let builtInMemberQuery = new RxAVQuery(PBMemberBuiltInProperties.className);
        builtInMemberQuery.equalTo(PBMemberBuiltInProperties.subCategory, 'member');

        let commonQuery = RxAVQuery.or(builtInRoleQuery, builtInMemberQuery);

        if (team) {
            let inTeamQuery = new RxAVQuery(PBMemberBuiltInProperties.className);
            inTeamQuery.equalTo(PBMemberBuiltInProperties.team, team.metaData);
            let combineQuery = RxAVQuery.or(commonQuery, inTeamQuery);
            return combineQuery.find();
        }

        return commonQuery.find();
    }



}
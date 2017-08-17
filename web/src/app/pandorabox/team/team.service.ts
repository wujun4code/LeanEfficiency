import { Injectable } from '@angular/core';
import { RxAVUser, RxAVQuery, RxAVObject, RxAVRole, RxAVACL } from 'rx-lean-js-core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PBTeam, PBTeamFields, PBPaymentTypeFields, PBTeamUserFields, PBPaymentType, PBUser, PBRole, PBBoss, PBStaff, PBMemberBuiltInProperties, PBTag } from '../objects';
import { DefaultAuthService } from '../auth/auth.service';


@Injectable()
export class DefaultTeamService {

    constructor() {
        // this.userService.currentUser().flatMap(user => {
        //     return this.loadTeams(user);
        // }).subscribe(userTeamsLoaded => {
        //     this._team = userTeamsLoaded[0];
        //     this.teamChanged = new BehaviorSubject<PBTeam>(this._team);
        // });
    }
    teamChanged: BehaviorSubject<PBTeam>;

    _teams: Array<PBTeam> = [];
    currentTeam: PBTeam;

    initBy(user: PBUser) {
        return this.getTeamQuery(user).map(teams => {
            this._teams = teams;
            this.teamChanged = new BehaviorSubject<PBTeam>(this.defaultTeam);
            return this._teams;
        });
    }

    get defaultTeam() {
        let sorted = this._teams.sort((a, b) => {
            return a.upatedAt.getTime() - b.upatedAt.getTime();
        });
        return sorted[0];
    }



    // current(userService: DefaultAuthService) {
    //     return userService.currentUser().flatMap(user => {
    //         return this.loadTeams(user);
    //     }).map(userTeamsLoaded => {
    //         this.currentTeam = userTeamsLoaded[0];
    //         this.teamChanged = new BehaviorSubject<PBTeam>(this.currentTeam);
    //         return this.currentTeam;
    //     });
    // }

    get validTeams() {
        return this._teams;
    }

    loadTeams(user: PBUser) {
        return this.getTeamQuery(user).map(teams => {
            this._teams = teams;
            return this._teams;
        });
    }

    getTeamQuery(user: PBUser) {
        let teamQuery = new RxAVQuery(PBTeamUserFields.className);
        teamQuery.equalTo(PBTeamUserFields.user, user.metaUser);
        teamQuery.include(PBTeamUserFields.team);
        return teamQuery.find().map(memberMapTeams => {
            return memberMapTeams.map(member => {
                let teamObj = member.get(PBTeamUserFields.team);
                return new PBTeam(teamObj);
            });
        });
    }

    getTeamQueryByDomain(teamDomain: any) {
        let teamQuery = new RxAVQuery(PBTeamFields.className);
        teamQuery.equalTo(PBTeamFields.domain, teamDomain);
        return teamQuery.find().map(teamList => {
            return new PBTeam(teamList[0]);
        });
    }

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

    _tags: Array<PBTag> = [];

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

        return commonQuery.find().map(fieldList => {
            return fieldList;
        });
    }

}
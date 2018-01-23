import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RxAVUser, RxAVObject, RxAVQuery } from 'rx-lean-js-core';
import * as random from "./util-service";
import { UserModel, InvitationTokenConfig, TeamModel, TeamFields, Relation_Team_User_Keys, RoleModel } from '../models';
import { UserService } from './user-service';
import { Relation_Team_Conversation } from '../models/relation-models';


@Injectable()
export class TeamService {
    _teams: Array<TeamModel>;
    _current: TeamModel;

    constructor(public userService: UserService) {

    }

    teams(user: UserModel): Observable<Array<TeamModel>> {
        console.log('query teams');
        console.log('current teams', this._teams);
        if (this._teams) {
            return Observable.from([this._teams]);
        }
        let query = new RxAVQuery(Relation_Team_User_Keys.className);
        query.equalTo(Relation_Team_User_Keys.keys.user, user.metaData);
        query.include(Relation_Team_User_Keys.keys.team);
        query.descending('updatedAt');
        return query.find().map(relation_user_teams => {
            let teamMetaDatas = relation_user_teams.map(r => {
                return r.get(Relation_Team_User_Keys.keys.team) as RxAVObject;
            });

            this._teams = teamMetaDatas.map(t => {
                return this.createTeamModelByMetaData(t);
            });;
            return this._teams;
        });
    }

    get(teamId: string) {
        let query = new RxAVQuery(TeamFields.className);
        query.equalTo('objectId', teamId);
        return query.find().map(teams => {
            if (teams.length > 0) {
                let team = teams[0];
                let teamModel = new TeamModel();
                teamModel.restoreFromAVObject(team);
                return teamModel;
            }
            return undefined;
        });
    }

    current(): Observable<TeamModel> {
        if (this._current) {
            return Observable.from([this._current]);
        } else return this.lastChoice();
    }

    go(hexName?: string) {
        if (this._current) {
            if (hexName == this._current.hexName || hexName == undefined) {
                return this.current();
            }
        } else if (hexName) {
            return this.getByHexName(hexName).map(team => {
                this._current = team;
                return this._current;
            });
        } else {
            this.lastChoice();
        }
    }
    lastChoice(): Observable<TeamModel> {
        return this.userService.current().flatMap(user => {
            return this.teams(user);
        }).map(teams => {
            return teams[0];
        });
    }

    getByHexName(hexName: string): Observable<TeamModel> {
        let query = new RxAVQuery(TeamFields.className);
        query.equalTo(TeamFields.keys.hexName, hexName);
        return query.find().map(teams => {
            if (teams.length > 0) {
                let team = teams[0];
                let teamModel = new TeamModel();
                teamModel.restoreFromAVObject(team);
                return teamModel;
            }
            return undefined;
        });
    }

    createTeamModelByMetaData(metaData: RxAVObject) {
        let teamModel = new TeamModel();
        teamModel.restoreFromAVObject(metaData);
        return teamModel;
    }

    generateToken(team: TeamModel, inviter: UserModel, email: string, mobile?: string) {
        let invitationToken = new RxAVObject(InvitationTokenConfig.className);
        invitationToken.set(InvitationTokenConfig.keys.email, email);
        if (mobile) {
            invitationToken.set(InvitationTokenConfig.keys.mobile, mobile);
        }
        invitationToken.set(InvitationTokenConfig.keys.invitedBy, inviter.id);
        invitationToken.set(InvitationTokenConfig.keys.token, random.newToken());
    }

    create(hexTeamName: string, teamName: string, creator: UserModel) {
        let team = new RxAVObject(TeamFields.className);
        team.set(TeamFields.keys.hexName, hexTeamName);
        team.set(TeamFields.keys.creator, creator.metaData);
        team.set(TeamFields.keys.name, teamName);
        team.ACL = TeamModel.getAdminACLByHexName(hexTeamName);
        return team.save().map(created => {
            let teamModel = new TeamModel();
            teamModel.restoreFromAVObject(team);
            return teamModel;
        });
    }

    add(team: TeamModel, user: UserModel) {
        let relation_team_user = new RxAVObject(Relation_Team_User_Keys.className);
        relation_team_user.set(Relation_Team_User_Keys.keys.user, user.metaData);
        relation_team_user.set(Relation_Team_User_Keys.keys.team, team.metaData);

        //relation_team_user.ACL = team.teamAdminACL;
        return relation_team_user.save();
    }

    members(team: TeamModel) {
        let query = new RxAVQuery(Relation_Team_User_Keys.className);
        query.equalTo(Relation_Team_User_Keys.keys.team, team.metaData);
        query.include(Relation_Team_User_Keys.keys.user);
        return query.find().map(relation_user_teams => {
            let userMetaDatas = relation_user_teams.map(r => {
                return r.get(Relation_Team_User_Keys.keys.user) as RxAVUser;
            });

            let users = userMetaDatas.map(metaData => {
                let user = new UserModel();
                user.restoreFromAVUser(metaData);
                return user;
            });

            return users;
        });
    }
}


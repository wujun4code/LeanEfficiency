import { BaseModel } from './base-model';
import { RxAVObject, RxAVACL } from 'rx-lean-js-core';
import { RoleModel } from './role-model';


export class TeamModel extends BaseModel {
    hexName: string;
    id: string;
    name: string;
    constructor() {
        let teamObj: RxAVObject = new RxAVObject(TeamFields.className);
        super(teamObj);
    }
    restoreFromAVObject(teamMetaData: RxAVObject) {
        this.metaData = teamMetaData;
        this.hexName = this.metaData.get(TeamFields.keys.hexName);
        this.name = this.metaData.get(TeamFields.keys.name);
        this.id = this.metaData.objectId;
    }

    get teamACL() {
        let teamACL = new RxAVACL();
        teamACL.setPublicReadAccess(false);
        teamACL.setPublicWriteAccess(false);

        teamACL.setRoleReadAccess(this.name, true);
        teamACL.setRoleWriteAccess(this.name, true);
        return teamACL;
    }

    get teamAdminACL() {
        let teamAdminRoleName = this.adminRoleName;
        let teamAdminACL = new RxAVACL();
        teamAdminACL.setPublicReadAccess(false);
        teamAdminACL.setPublicWriteAccess(false);

        teamAdminACL.setRoleReadAccess(teamAdminRoleName, true);
        teamAdminACL.setRoleWriteAccess(teamAdminRoleName, true);
        return teamAdminACL;
    }

    get adminRoleName() {
        return TeamModel.getAdminRoleNameByTeamHexName(this.hexName);
    }
    public static getAdminRoleNameByTeamHexName(hexName: string) {
        return `${hexName}_admin`;;
    }
    public static getAdminACLByHexName(hexName: string) {
        let teamAdminRoleName = TeamModel.getAdminRoleNameByTeamHexName(hexName);
        let teamAdminACL = new RxAVACL();
        teamAdminACL.setPublicReadAccess(false);
        teamAdminACL.setPublicWriteAccess(false);

        teamAdminACL.setRoleReadAccess(teamAdminRoleName, true);
        teamAdminACL.setRoleWriteAccess(teamAdminRoleName, true);
        return teamAdminACL;
    }
}

export const TeamFields = {
    className: 'Team',
    keys: {
        name: 'name',
        hexName: 'hexName',
        creator: 'creator',
    }
};
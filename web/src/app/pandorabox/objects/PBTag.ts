import { PBObject } from './PBObject';
import { Observable } from 'rxjs';
import { PBRole } from './PBRole';
import { PBUser } from './PBUser';
import { PBTeam } from './PBTeam';
import { PBTeamUserFields } from './PBTeamUser';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

export class PBTag extends PBObject {
    constructor(tagObj: RxAVObject) {
        super(tagObj);
    }

    get name() {
        return this.metaData.get(PBTagFields.name);
    }

    static query(team?: PBTeam) {
        let builtInTagQuery = new RxAVQuery(PBTagFields.className);
        builtInTagQuery.equalTo(PBTagFields.scope, 'app');
        let commonQuery = builtInTagQuery;

        if (team) {
            let inTeamQuery = new RxAVQuery(PBTagFields.className);
            inTeamQuery.equalTo(PBTagFields.team, team.metaData);
            let combineQuery = RxAVQuery.or(commonQuery, inTeamQuery);

            commonQuery = combineQuery;
        }

        return commonQuery.find().map(list => {
            return list.map(t => new PBTag(t));
        });
    }
}

export const PBTagFields = {
    className: 'PBTag',
    name: 'name',
    scope: 'scope',
    team: 'team'
};
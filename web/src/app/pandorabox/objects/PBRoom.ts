import { PBObject } from './PBObject';
import { Observable } from 'rxjs';
import { PBRole } from './PBRole';
import { PBUser } from './PBUser';
import { PBTeamUserFields } from './PBTeamUser';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';
const _hasOwnProperty = Object.prototype.hasOwnProperty;
export const has = function (obj: any, prop: any) {
    return _hasOwnProperty.call(obj, prop);
};

export class PBRoom extends PBObject {

    constructor(roomObj: RxAVObject) {
        super(roomObj);
    }

    get serial() {
        return this.metaData.get(PBRoomFields.serial);
    }
}

export const PBRoomFields = {
    className: 'PBRoom',
    location: 'location',
    serial: 'serial',
    id: 'id',
    address: 'address',
    team: 'team',
    builtInStates: [
        {
            key: 'available',
        }, {
            key: 'busy',
        }, {
            key: 'booked'
        }
    ],
}

import { PBObject } from './PBObject';
import { Observable } from 'rxjs';
import { PBRole } from './PBRole';
import { PBUser } from './PBUser';
import { PBRoom } from './PBRoom';
import { PBMember } from './PBMember';
import { PBTeamUserFields, PBTeamUser } from './PBTeamUser';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

export class PBTicket extends PBObject {
    constructor(ticketObj: RxAVObject) {
        super(ticketObj);
    }

    _pbWaiterMember: PBMember;
    get pbWaiterMember(): PBMember {
        if (this._pbWaiterMember == undefined) {
            this._pbWaiterMember = new PBMember(this.waiter);
        }
        return this._pbWaiterMember;
    }

    _pbRoom: PBRoom;
    get pbRoom(): PBRoom {
        if (this._pbRoom == undefined) {
            this._pbRoom = new PBRoom(this.room);
        }
        return this._pbRoom;
    }

    _pbReception: PBMember;
    get pbReception() {
        if (this._pbReception == undefined) {
            this._pbReception = new PBMember(this.reception);
        }
        return this._pbReception;
    }

    get reception() {
        return this.metaData.get(PBTicketFields.reception);
    }

    get serial() {
        return this.metaData.get(PBTicketFields.serial);
    }

    get serviceState() {
        return this.metaData.get(PBTicketFields.serviceState);
    }

    get paidWay() {
        return this.metaData.get(PBTicketFields.paidWay);
    }

    get actualPaid() {
        let result = this.metaData.get(PBTicketFields.actualPaid);
        if (result == undefined) return 0;
        return this.metaData.get(PBTicketFields.actualPaid);
    }

    get waiterSerial() {
        return this.pbWaiterMember.serial;
    }

    get waiter() {
        return this.metaData.get(PBTicketFields.waiter);
    }

    get room() {
        return this.metaData.get(PBTicketFields.room);
    }

    get roomSerial() {
        return this.pbRoom.serial;
    }

    get team() {
        return this.metaData.get(PBTicketFields.team);
    }

}

export const PBTicketFields = {
    className: 'PBTicket',
    serial: 'serial',
    team: 'team',
    reception: 'reception',
    serviceState: 'serviceState',
    shouldPay: 'shouldPay',
    actualPaid: 'actualPrice',
    room: 'room',
    waiter: 'waiter',
    paidWay: 'paidWay',
    serviceStateEnums: [
        {
            key: 'inProgress'
        }, {
            key: 'notStarted'
        }, {
            key: 'finished'
        }
    ],
    paidWayEnums: [
        {
            key: 'cash'
        }, {
            key: 'transfer'
        }, {
            key: 'undefined'
        }
    ]
};
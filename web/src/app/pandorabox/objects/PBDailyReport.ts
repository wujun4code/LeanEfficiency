import { PBObject } from './PBObject';
import { Observable } from 'rxjs';
import { PBTicket } from './PBTicket';
import { PBService, PBServiceFields } from './PBService';
import { PBMember } from './PBMember';
import { PBRoom } from './PBRoom';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';
import * as _ from 'lodash';

export class PBDailyReport {
    constructor(_root: PBTicket) {
        this.root = _root;
    }
    root: PBTicket;
    services: Array<PBService> = [];
    room: PBRoom;

    load() {
        this.serviceQuery().subscribe(() => {
            this.services.forEach(s => {
                s.load();
            });
        });
    }

    serviceQuery() {
        let query = new RxAVQuery(PBServiceFields.className);
        query.equalTo(PBServiceFields.ticket, this.root.metaData);
        query.include(PBServiceFields.project, PBServiceFields.technician);
        return query.find().map(list => {
            list.forEach(l => {
                let s = new PBService(l);
                this.services.push(s);
            });
        });
    }

    get serial() {
        return this.root.serial;
    }

    get projectSerials() {
        return _.join(this.services.map(s => s.projectSerial, '/'));
    }

    get projectNames() {
        return _.join(this.services.map(s => s.projectName, '/'));
    }

    get roomSerial() {
        return this.root.roomSerial;
    }

    get technicianSerials() {
        return _.join(this.services.map(s => s.technicianSerial, '/'));
    }

    get shouldPay() {
        let r = _.sumBy(this.services, s => s.price);
        return this.monetize(r);
    }

    get actualPaid() {
        let r = this.root.actualPaid;
        return this.monetize(r);
    }

    get actualDeduct() {
        let r = _.sumBy(this.services, s => s.deduct);
        return this.monetize(r);
    }

    get receptionSerial() {
        return this.root.pbReception.serial;
    }

    get paidWay() {
        return this.root.paidWay;
    }

    monetize(sum: number) {
        return `￥${sum}.0`;
    }


    get(key: string) {
        return this[key];
    }
}
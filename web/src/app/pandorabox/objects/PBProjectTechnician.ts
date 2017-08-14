import { PBObject } from './PBObject';
import { Observable } from 'rxjs';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

export class PBProjectTechnician extends PBObject {
    constructor(serverObj: RxAVObject) {
        super(serverObj);
    }

    get deductPrice() {
        return this.metaData.get(PBProjectTechnicianFields.deductPrice);
    }
}

export const PBProjectTechnicianFields = {
    className: 'PBProjectTechnician',
    team: 'team',
    technician: 'technician',
    project: 'project',
    deductPrice: 'deductPrice',
    demoDeductPercent: [
        0.4, 0.5, 0.6, 0.75, 0.8
    ]
};
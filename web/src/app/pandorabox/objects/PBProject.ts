import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';
import { PBObject } from './PBObject';
import { Observable } from 'rxjs';

export class PBProject extends PBObject {
    constructor(projectObj: RxAVObject) {
        super(projectObj);
    }

    get name() {
        return this.metaData.get(PBProjectFields.name);
    }

    get serial() {
        return this.metaData.get(PBProjectFields.serial);
    }
    
    get price() {
        let result = this.metaData.get(PBProjectFields.price);
        if(result == undefined) return 0;
        return result;
    }

}

export const PBProjectFields = {
    className: 'PBProject',
    team: 'team',
    name: 'name',
    serial: 'serial',
    price: 'price',
    demoPrice: [
        40, 60, 80, 100, 120, 150, 180, 200, 300, 400, 500
    ]
};
import { PBObject } from './PBObject';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

export class PBPaymentType extends PBObject {
    get name() {
        return this.metaData.get(PBPaymentTypeFields.name) || '';
    }

    getUserLimit(scope: string): number {
        switch (scope) {
            case 'sum':
            case 'total':
            case 'all': {
                return this.metaData.get(PBPaymentTypeFields.sum);
            }

            case 'laoban':
            case 'boss': {
                return this.metaData.get(PBPaymentTypeFields.boss);
            }

            case 'jingli':
            case 'manager': {
                return this.metaData.get(PBPaymentTypeFields.manager);
            }

            case 'shouyin':
            case 'cashier': {
                return this.metaData.get(PBPaymentTypeFields.cashier);
            }

            case 'jiedai':
            case 'reception': {
                return this.metaData.get(PBPaymentTypeFields.reception);
            }

            case 'jishi':
            case 'technician': {
                return this.metaData.get(PBPaymentTypeFields.technician);
            }

            default:
                break;
        }
        return this.metaData.get(PBPaymentTypeFields.sum);
    }
}

export const PBPaymentTypeFields = {
    className: 'PBPaymentType',
    sum: 'sum',
    name: 'name',
    boss: 'boss',
    manager: 'manager',
    cashier: 'cashier',
    reception: 'reception',
    technician: 'technician',
    valid: 'valid'
}
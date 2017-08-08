var rxLeanCloud = require('rx-lean-js-core');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;

require('./appConfig');

var saRoleName = 'sa';

const paymentTypes =
    [{
        name: '体验版',
        sum: 5,
        boss: 1,
        manager: 0,
        cashier: 1,
        reception: 1,
        technician: 2
    },
    {
        name: '基础版',
        sum: 20,
        boss: 1,
        manager: 1,
        cashier: 2,
        reception: 2,
        technician: 15
    },
    {
        name: '企业版',
        sum: 200,
        boss: 1,
        manager: 5,
        cashier: 5,
        reception: 15,
        technician: 180
    }];

const PBPaymentTypeFields = {
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

function initPaymentTypes() {
    let paymentObjs = [];

    let acl = new RxAVACL();
    acl.setPublicWriteAccess(false);
    acl.setWriteAccess(saRoleName, true);

    paymentTypes.forEach(paymentType => {
        let obj = new RxAVObject(PBPaymentTypeFields.className);
        obj.set(PBPaymentTypeFields.name, paymentType.name);
        obj.set(PBPaymentTypeFields.sum, paymentType.sum);
        obj.set(PBPaymentTypeFields.boss, paymentType.boss);
        obj.set(PBPaymentTypeFields.manager, paymentType.manager);
        obj.set(PBPaymentTypeFields.cashier, paymentType.cashier);
        obj.set(PBPaymentTypeFields.reception, paymentType.reception);
        obj.set(PBPaymentTypeFields.technician, paymentType.technician);
        obj.ACL = acl;
        paymentObjs.push(obj);
    });

    RxAVObject.saveAll(paymentObjs).subscribe(inited => {
        console.log('payment types inited.');
    });
}

initPaymentTypes();
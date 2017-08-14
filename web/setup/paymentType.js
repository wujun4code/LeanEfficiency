var rxLeanCloud = require('rx-lean-js-core');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;

require('./appConfig');
var config = require('./config');

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

function initPaymentTypes() {
    let paymentObjs = [];

    paymentTypes.forEach(paymentType => {
        let obj = new RxAVObject(config.PBPaymentTypeFields.className);
        obj.set(config.PBPaymentTypeFields.name, paymentType.name);
        obj.set(config.PBPaymentTypeFields.sum, paymentType.sum);
        obj.set(config.PBPaymentTypeFields.boss, paymentType.boss);
        obj.set(config.PBPaymentTypeFields.manager, paymentType.manager);
        obj.set(config.PBPaymentTypeFields.cashier, paymentType.cashier);
        obj.set(config.PBPaymentTypeFields.reception, paymentType.reception);
        obj.set(config.PBPaymentTypeFields.technician, paymentType.technician);
        obj.ACL = config.saACL;
        paymentObjs.push(obj);
    });

    RxAVObject.saveAll(paymentObjs).subscribe(inited => {
        console.log('payment types inited.');
    });
}

initPaymentTypes();
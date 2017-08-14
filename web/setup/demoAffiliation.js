var rxLeanCloud = require('rx-lean-js-core');
var rxjs = require('rxjs');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
require('./appConfig');
var tool = require('./tool');
var config = require('./config');


function sum(n) {
    if (n == 1)
        return n;
    return sum(n - 1) + n;
}

function group(length, n) {
    let result = [];

}

/**
 * 
 */

function generateAffiliation(receptionCount, technicianCount) {
    let receptionQuery = config.getReceptionQuery(receptionCount);
    let technicianQuery = config.getTechnicianQuery(technicianCount);

    return receptionQuery.find().concatMap(ev => technicianQuery.find(), (a, b) => {
        let result = [];
        for (let i = 0; i < technicianCount; i++) {
            let affiliation_obj = new RxAVObject(config.PBAffiliationFields.className);

            let t = b[i];
            let r = a.random();

            affiliation_obj.set(config.PBAffiliationFields.technician, t);
            affiliation_obj.set(config.PBAffiliationFields.reception, r);
            affiliation_obj.ACL = config.teamACL;

            result.push(affiliation_obj);
        }
        return result;
    });
}

function initAffiliation(receptionCount, technicianCount) {
    return generateAffiliation(receptionCount, technicianCount).flatMap(a => {
        return RxAVObject.saveAll(a);
    });
}

initAffiliation(6, 30).subscribe(success => {
    console.log('success', success);
});
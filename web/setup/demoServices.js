var rxLeanCloud = require('rx-lean-js-core');
var rxjs = require('rxjs');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
require('./appConfig');
var tool = require('./tool');
var config = require('./config');


function generateService(count) {

    let ticketQuery = config.getTicketQuery(count);
    let projectQuery = config.getPorjectQuery(count);
    let technicianQuery = config.getTechnicianQuery(count);

    let data = ticketQuery.find().concatMap(ev1 => technicianQuery.find(), (a, b) => {
        return {
            a: a,
            b: b
        }
    }).concatMap(ev2 => projectQuery.find(), (d, c) => {
        return {
            a: d.a,
            b: d.b,
            c: c
        }
    });
    return data.map(aggregation => {
        let result = [];
        for (let i = 0; i < count; i++) {
            let serviceObj = new RxAVObject(config.PBServiceFields.className);
            serviceObj.set(config.PBServiceFields.ticket, aggregation.a[i]);
            serviceObj.set(config.PBServiceFields.technician, aggregation.b[i]);
            serviceObj.set(config.PBServiceFields.project, aggregation.c.random());
            result.push(serviceObj);
        }
        return result;
    });
}

generateService(20).flatMap(s => {
    return RxAVObject.saveAll(s);
}).subscribe(saved => {
    console.log('saved', saved);
});

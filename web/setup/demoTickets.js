var rxLeanCloud = require('rx-lean-js-core');
var rxjs = require('rxjs');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
require('./appConfig');
var tool = require('./tool');
var config = require('./config');


function generateTicket(count, seed) {
    let _seed = seed ? seed : 1;
    let roomQuery = new RxAVQuery(config.PBRoomFields.className);
    roomQuery.equalTo(config.PBRoomFields.team, config.teamObj);
    roomQuery.limit(count);

    let receptionQuery = config.getReceptionQuery(count);

    return roomQuery.find().concatMap(ev => receptionQuery.find(), (x, y) => {
        //return { room: x, technician: y };

        let result = [];
        let states = config.PBTicketFields.serviceStateEnums.map(s => s.key);
        let paidWays = config.PBTicketFields.paidWayEnums.map(p => p.key);
        for (let i = 0; i < count; i++) {
            let ticketObj = new RxAVObject(config.PBTicketFields.className);
            ticketObj.set(config.PBTicketFields.room, x[i]);
            ticketObj.set(config.PBTicketFields.team, config.teamObj);
            let randomReception = y.random();
            ticketObj.set(config.PBTicketFields.reception, randomReception);
            let price = config.getRandomInt(60, 200);
            let state = states.random();
            ticketObj.set(config.PBTicketFields.serviceState, state);
            let serial = `#${seed + i}`;
            ticketObj.set(config.PBTicketFields.serial, serial);
            //ticketObj.set(config.PBTicketFields.shouldPay, price);
            let paidWay = paidWays.random();
            ticketObj.set(config.PBTicketFields.paidWay, paidWay);
            ticketObj.ACL = config.teamACL;
            result.push(ticketObj);
        }
        return result;
    });
}

generateTicket(20, 1).flatMap(tickets => {
    return RxAVObject.saveAll(tickets);
}).subscribe(created => {
    console.log('ticket', created);
});

function test(count, seed) {
    let roomQuery = new RxAVQuery(config.PBRoomFields.className);
    roomQuery.equalTo(config.PBRoomFields.team, config.teamObj);
    roomQuery.limit(count);
    roomQuery.find().subscribe(rooms => {
        console.log('rooms', rooms.length);
    });
}

function appendReception(ticketCount, receptionCount) {
    let ticketQuery = config.getTicketQuery(ticketCount);
    let receptionQuery = config.getReceptionQuery(receptionCount);

    return ticketQuery.find().concatMap(ev => receptionQuery.find(), (a, b) => {
        let result = [];
        for (let i = 0; i < ticketCount; i++) {
            let t = a[i];
            let r = b.random();
            t.set(config.PBTicketFields.reception, r);
            result.push(t);
        }
        return result;
    });
}

// RxAVUser.logIn('sa', 'p@ssw0rd').flatMap(loggedIn => {
//     return appendReception(20, 6);
// }).flatMap(ts => {
//     return RxAVObject.saveAll(ts);
// }).subscribe(success => {
//     console.log('success', success);
// });



// test(10);

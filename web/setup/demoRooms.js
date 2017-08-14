var rxLeanCloud = require('rx-lean-js-core');
var rxjs = require('rxjs');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
require('./appConfig');
var tool = require('./tool');
var config = require('./config');

function generateRoom(layer, countPerLayer, length) {
    let result = [];
    for (let i = 1; i < layer + 1; i++) {
        for (let j = 1; j < countPerLayer + 1; j++) {
            let s = j.toString();
            let padded = s.lpad('0', length);
            result.push(`${i}${padded}`)
        }
    }
    return result;
}

function initRoom(teamDomain, serial) {

    return config.getTeamObj(teamDomain).flatMap(teamObj => {

    });
}


function initDemoRooms(teamDomain) {

    return config.getTeamObj(teamDomain).flatMap(teamObj => {
        let roomSerial = generateRoom(3, 10, 3);
        let roomObjs = roomSerial.map(serial => {
            let roomObj = new RxAVObject(config.PBRoomFields.className);

            roomObj.set(config.PBRoomFields.team, teamObj);
            roomObj.set(config.PBRoomFields.serial, serial);

            let teamACL = config.getTeamACL(teamDomain);
            roomObj.ACL = teamACL;

            return roomObj.save();
        });
        return rxjs.Observable.merge(...roomObjs);
    });
}

initDemoRooms('monkey').subscribe(saved => {
    console.log('saved', saved);
});
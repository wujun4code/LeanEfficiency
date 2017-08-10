var rxLeanCloud = require('rx-lean-js-core');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;

require('./appConfig');
var tool = require('./tool');
var config = require('./config');
var randomName = require("chinese-random-name");
var rxjs = require('rxjs');

var saRoleName = 'sa';
var acl = new RxAVACL();
acl.setPublicWriteAccess(false);
acl.setWriteAccess(saRoleName, true);

let teamName = 'kbsj';
var teamACL = new RxAVACL();
teamACL.setPublicWriteAccess(false);
teamACL.setWriteAccess(teamName, true);

let teamObj = RxAVObject.createWithoutData('PBTeam', '598a7b6f570c350069a1c0f4');

function initTechnicians() {
    let propertyQuery = new RxAVQuery(config.PBPropertyFields.className);
    propertyQuery.equalTo(config.PBPropertyFields.scope, 'app');
    propertyQuery.equalTo(config.PBPropertyFields.subCategory, 'member');

    return propertyQuery.find().map(propertyList => {
        let fields = propertyList.map(p => p.get(config.PBPropertyFields.propertyName));
        console.log('fields', fields);
        return fields;
    }).flatMap(fields => {
        let count = 10;
        let demoUsers = [];
        for (var i = 0; i < count; i++) {

            let technicianUser = new RxAVUser();
            technicianUser.password = '123456';
            fields.forEach(key => {
                if (key == 'mobile') {
                    let mobileValue = tool.newMobilePhoneNumber();
                    console.log('mobilephone', mobileValue);
                    technicianUser.mobilephone = mobileValue;
                    technicianUser.username = mobileValue;
                    technicianUser.set('weixin', mobileValue);
                } else if (key == 'serial') {
                    technicianUser.set('serial', `js${i + 1 + 20}`);
                } else if (key == 'nickName') {
                    let nickName = randomName.names.get2();
                    console.log('nickName', nickName);
                    technicianUser.set(key, nickName);
                }
            });
            let member = technicianUser.create().flatMap(created => {
                let team_user_relation_obj = new RxAVObject('PBTeamUser');

                team_user_relation_obj.set('user', technicianUser);
                team_user_relation_obj.set('team', teamObj);
                team_user_relation_obj.set('roles', [teamName + '_' + 'technician']);

                team_user_relation_obj.ACL = teamACL;

                return team_user_relation_obj.save();
            });
            demoUsers.push(member);
        }

        return rxjs.Observable.merge(...demoUsers);
    });
}
try {
    initTechnicians().subscribe(haha => {
        console.log('50 users.');
    });
}
catch (err) {
    console.error("Caught exception:", err.stack);
}


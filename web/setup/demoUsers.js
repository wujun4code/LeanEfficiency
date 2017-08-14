var rxLeanCloud = require('rx-lean-js-core');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
var RxAVRole = rxLeanCloud.RxAVRole;
require('./appConfig');

var tool = require('./tool');
var config = require('./config');
var randomName = require("chinese-random-name");
var rxjs = require('rxjs');

// let teamObj = RxAVObject.createWithoutData('PBTeam', '598a7b6f570c350069a1c0f4');

function assignRole(teamDomain, users, roleKey) {

    return config.getRoleObj(teamDomain, roleKey).flatMap(role => {
        console.log('role', role);
        return role.grant(users);
    });
}

function initUser(teamDomain, roleKey, serial) {
    return config.loggedInSA().flatMap(sa => {

        let propertyQuery = new RxAVQuery(config.PBPropertyFields.className);
        propertyQuery.equalTo(config.PBPropertyFields.scope, 'app');
        propertyQuery.equalTo(config.PBPropertyFields.subCategory, 'member');

        return propertyQuery.find().map(propertyList => {
            let fields = propertyList.map(p => p.get(config.PBPropertyFields.propertyName));
            console.log('fields', fields);
            return fields;
        });
    }).flatMap(fields => {
        let user = new RxAVUser();
        user.password = '123456';
        fields.forEach(key => {
            if (key == 'mobile') {
                let mobileValue = tool.newMobilePhoneNumber();
                console.log('mobilephone', mobileValue);
                user.mobilephone = mobileValue;
                user.username = mobileValue;
                user.set('weixin', mobileValue);
            } else if (key == 'nickName') {
                let nickName = '';
                if (roleKey == config.PBTeamUserFields.technicianRole) {
                    nickName = tool.randomPopularFemaleName();
                } else if (roleKey == config.PBTeamUserFields.receptionRole || roleKey == config.PBTeamUserFields.casherRole || roleKey == config.PBTeamUserFields.roomAdminRole) {
                    nickName = tool.rundomReceptionName();
                }
                user.set(key, nickName);
            }
        });
        return user.create().map(s => {
            return user;
        });
    }).flatMap(createdUser => {
        return assignRole(teamDomain, createdUser, roleKey).map(assigned => {
            return createdUser;
        });
    }).flatMap(assignedUser => {

        return config.getTeamObj(teamDomain).flatMap(teamObj => {
            let team_user_relation_obj = new RxAVObject(config.PBTeamUserFields.className);
            let roleConfig = config.PBTeamUserFields.roleConfig.find(r => r.key == roleKey);
            let serialStr = `${roleConfig.serialPrefix}${serial}`;

            let relationRoleNames = [teamDomain + roleConfig.roleSuffix];
            team_user_relation_obj.set(config.PBTeamUserFields.serial, serialStr);
            team_user_relation_obj.set(config.PBTeamUserFields.user, assignedUser);
            team_user_relation_obj.set(config.PBTeamUserFields.team, teamObj);
            team_user_relation_obj.set(config.PBTeamUserFields.roles, relationRoleNames);

            team_user_relation_obj.ACL = config.getTeamACL(teamDomain);
            return team_user_relation_obj.save();
        });
    });
}

function initUsers(teamDomain, count, roleKey, seed) {
    let ops = [];
    for (let i = 0; i < count; i++) {
        let creating = initUser(teamDomain, roleKey, seed + i + 1);
        ops.push(creating);
    }
    return rxjs.Observable.merge(...ops);
}

function initTechnician(teamDomain, count, seed) {
    return initUsers(teamDomain, count, config.PBTeamUserFields.technicianRole, seed);
}

function initReception(teamDomain, count, seed) {
    return initUsers(teamDomain, count, config.PBTeamUserFields.receptionRole, seed);
}

// function patchSerial(count, seed, roleName) {
//     let query;
//     if (roleName == config.PBTeamUserFields.technicianRole) {
//         query = config.getTechnicianQuery(count);
//     } else {
//         query = config.getReceptionQuery(count);
//     }

//     return query.find().flatMap(list => {
//         let r = [];
//         for (var i = 0; i < count; i++) {
//             let serial = '';
//             if (roleName == config.PBTeamUserFields.technicianRole) {
//                 serial = `js${i + 1 + seed}`;
//             } else if (roleName == config.PBTeamUserFields.receptionRole) {
//                 serial = `jd${i + 1 + seed}`;
//             }
//             let member = list[i];
//             member.set(config.PBTeamUserFields.serial, serial);
//             r.push(member);
//         }
//         return RxAVObject.saveAll(r);
//     });
// }

function newARoomAdmin(teamDomain) {
    return initUsers(teamDomain, 1, config.PBTeamUserFields.roomAdminRole, 0);
}

// RxAVUser.logIn('sa', 'p@ssw0rd').flatMap(loggedIn => {
//     return patchSerial(30, 0, config.PBTeamUserFields.technicianRole);
// }).subscribe(xx => {
//     console.log('xx', xx);
// });


//x2
// initReception(6, 0).subscribe(created => {
//     console.log('created', created);
// });

// x1
// initUser('monkey', config.PBTeamUserFields.technicianRole, 1).subscribe(s => {
//     console.log('initUser', s);
// });


// initTechnician('monkey', 4, 1).subscribe(created => {
//     console.log('created', created);
// });

initUser('monkey', config.PBTeamUserFields.roomAdminRole, 1).subscribe(s => {
    console.log('initUser', s);
});

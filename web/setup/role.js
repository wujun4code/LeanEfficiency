var rxLeanCloud = require('rx-lean-js-core');
var RxAVRole = rxLeanCloud.RxAVRole;
var RxAVUser = rxLeanCloud.RxAVUser;
var RxAVACL = rxLeanCloud.RxAVACL;

require('./appConfig');
var tool = require('./tool');
var config = require('./config');

var saRoleName = 'sa';
var password = 'p@ssw0rd';
function initSA() {
    let sa = new RxAVUser();
    sa.username = 'sa';
    sa.password = password;

    sa.signUp().flatMap(saSignUped => {
        let saRole = new RxAVRole();
        saRole.name = saRoleName;

        let saRoleACL = new RxAVACL();
        saRoleACL.setPublicWriteAccess(false);
        saRoleACL.setWriteAccess(sa, true);

        saRole.ACL = saRoleACL;
        return saRole.save();
    }).subscribe(saRoleInited => {
        console.log('saRoleInited', saRoleInited);
    });
}
//initSA();

function getTeamRole() {
    return config.getTeamRoleQuery();
}

function assignRole() {
    let saRoleName = 'sa';
    let teamRoleName = config.teamName;

    return RxAVRole.getByName(teamRoleName).concatMap(ev => RxAVRole.getByName(saRoleName), (a, b) => {
        console.log('a', a, 'b', b);
        return a.grant(b);
    });
}
config.loggedInSA().flatMap(loggedIn => {
    return assignRole();
}).flatMap(granted => {
    return granted;
}).subscribe(aaa => {
    console.log('aaa', aaa);
});


// var user;
// RxAVUser.logIn('sa', 'p@ssw0rd').flatMap(loggedIn => {
//     user = loggedIn;
//     return getTeamRole().find();
// }).flatMap(roleList => {
//     console.log('roleList', roleList);
//     let roleObj = roleList[0];
//     let roleId = roleObj.objectId;
//     let roleName = roleObj.get('name');
//     let role = RxAVRole.createWithName(roleName, roleId);
//     return role.grant(user);
// }).subscribe(granted => {
//     console.log('granted', granted);
// });
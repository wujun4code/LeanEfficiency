var rxLeanCloud = require('rx-lean-js-core');
var rxjs = require('rxjs');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
var RxAVRole = rxLeanCloud.RxAVRole;
require('./appConfig');
var tool = require('./tool');
var config = require('./config');

function getRoleName(teamDomain, roleKey) {
    return config.getRoleName(teamDomain, roleKey);
}

function getRoleObj(teamDomain, roleKey) {
    return config.getRoleObj(teamDomain, roleKey);
}

function createTeamBossRole(domain) {

    return config.loggedInSA().flatMap(saUser => {

        let bossRoleName = getRoleName(domain, config.PBTeamUserFields.bossRole);

        let teamBossRole = new RxAVRole(bossRoleName);

        let bossRoleACL = new RxAVACL();

        bossRoleACL.setPublicReadAccess(false);
        bossRoleACL.setPublicWriteAccess(false);

        bossRoleACL.setRoleWriteAccess(bossRoleName, true);
        bossRoleACL.setRoleWriteAccess(config.saRoleName, true);

        bossRoleACL.setRoleReadAccess(bossRoleName, true);

        teamBossRole.ACL = bossRoleACL;

        return teamBossRole.save().map(success => {
            return teamBossRole;
        });
    }).flatMap(bossRole => {
        return config.getSARole().flatMap(saRole => {
            return bossRole.grant(saRole);
        });
    });
}

function createTeamManagerRole(domain) {

    return config.loggedInSA().flatMap(saUser => {

        let bossRoleName = getRoleName(domain, config.PBTeamUserFields.bossRole);
        let managerRoleName = getRoleName(domain, config.PBTeamUserFields.managerRole);

        let teamManagerRole = new RxAVRole(managerRoleName);

        let managerRoleACL = new RxAVACL();

        managerRoleACL.setPublicReadAccess(false);
        managerRoleACL.setPublicWriteAccess(false);

        managerRoleACL.setRoleWriteAccess(bossRoleName, true);

        managerRoleACL.setRoleReadAccess(managerRoleName, true);

        teamManagerRole.ACL = managerRoleACL;

        return teamManagerRole.save().map(success => {
            return teamManagerRole;
        });
    }).flatMap(managerRole => {

        return getRoleObj(domain, config.PBTeamUserFields.bossRole).flatMap(bossRoleObj => {
            console.log('bossRoleObj', bossRoleObj.name);
            return managerRole.grant(bossRoleObj);
        });
    });
}

function createTeamRoomAdminRole(domain) {

    return config.loggedInSA().flatMap(saUser => {

        let managerRoleName = getRoleName(domain, config.PBTeamUserFields.managerRole);
        let roomAdminRoleName = getRoleName(domain, config.PBTeamUserFields.roomAdminRole);
        let teamRoleName = getRoleName(domain);

        let teamRoomAdminRole = new RxAVRole(roomAdminRoleName);

        let roomAdminRoleACL = new RxAVACL();

        roomAdminRoleACL.setPublicReadAccess(false);
        roomAdminRoleACL.setPublicWriteAccess(false);

        roomAdminRoleACL.setRoleWriteAccess(managerRoleName, true);

        roomAdminRoleACL.setRoleReadAccess(teamRoleName, true);

        teamRoomAdminRole.ACL = roomAdminRoleACL;

        return teamRoomAdminRole.save().map(success => {
            return teamRoomAdminRole;
        });
    }).flatMap(roomAdminRole => {

        return getRoleObj(domain, config.PBTeamUserFields.managerRole).flatMap(managerRoleObj => {
            console.log('managerRoleObj', managerRoleObj.name);
            return roomAdminRole.grant(managerRoleObj);
        });
    });
}

function createTeamMemberRole(domain, roleKey) {
    return config.loggedInSA().flatMap(saUser => {

        let managerRoleName = getRoleName(domain, config.PBTeamUserFields.managerRole);
        let targerRoleName = getRoleName(domain, roleKey);
        let teamRoleName = getRoleName(domain);

        let targetRole = new RxAVRole(targerRoleName);

        let targetRoleACL = new RxAVACL();

        targetRoleACL.setPublicReadAccess(false);
        targetRoleACL.setPublicWriteAccess(false);

        targetRoleACL.setRoleWriteAccess(managerRoleName, true);

        targetRoleACL.setRoleReadAccess(teamRoleName, true);

        targetRole.ACL = targetRoleACL;

        return targetRole.save().map(success => {
            return targetRole;
        });
    }).flatMap(targetRole => {

        return getRoleObj(domain, config.PBTeamUserFields.managerRole).flatMap(managerRoleObj => {
            console.log('managerRoleObj', managerRoleObj.name);
            return targetRole.grant(managerRoleObj).map(granted => {
                return targetRole;
            });
        });
    });
}

function createTeamRole(teamDomain) {
    return createTeamMemberRole(teamDomain).flatMap(teamRole => {
        let memberRoles = [config.PBTeamUserFields.roomAdminRole, config.PBTeamUserFields.casherRole, config.PBTeamUserFields.receptionRole, config.PBTeamUserFields.technicianRole];
        let tasks = memberRoles.map(memberRole => {
            let assignTask = getRoleObj(teamDomain, memberRole).flatMap(memberRoleObj => {
                return teamRole.grant(memberRoleObj);
            });
            return assignTask;
        });
        return rxjs.Observable.combineLatest(...tasks);
    });
}

/**
 * 1. 创建 AVRole {domain}
 * 2. 创建 boss role {domain_boss}
 * 3. 创建 manager role {domain_manager}
 * 4. 创建 fangguan role {domain_roomAdmin}
 * 5. 创建 jiedai role {domain_reception}
 * 6. 创建 technician role {domain_technician}
 * 7. 创建 casher role {domain_casher}
 * 
 * @param {any} domain 
 */
function newATeam(teamName, domain, paymentTypeId) {
    // 1. 创建 Team 对象
    let teamObj = new RxAVObject(config.PBTeamFields.className);
    teamObj.set(config.PBTeamFields.name, teamName);
    teamObj.set(config.PBTeamFields.domain, domain);
    let paymentTypeObj = RxAVObject.createWithoutData(config.PBPaymentTypeFields.className, paymentTypeId);
    teamObj.set(config.PBTeamFields.paymentType, paymentTypeObj);

    let teamRoleName = `${domain}`;

    let bossRoleConfig = config.PBTeamUserFields.roleConfig.find(r => r.key == config.PBTeamUserFields.bossRole);
    let bossRoleName = `${domain}${bossRoleConfig.roleSuffix}`;

    let managerConfig = config.PBTeamUserFields.roleConfig.find(r => r.key == config.PBTeamUserFields.managerRole);
    let managerRoleName = `${domain}${managerConfig.roleSuffix}`;

    let acl = new RxAVACL();
    acl.setPublicWriteAccess(false);
    acl.setPublicReadAccess(false);

    acl.setRoleReadAccess(teamRoleName, true);

    acl.setRoleWriteAccess(bossRoleName, true);
    acl.setRoleWriteAccess(managerRoleName, true);

    teamObj.ACL = acl;

    return teamObj.save();
}

let teamName = 'Monkey';
let teamDomain = 'monkey';

// newATeam('Monkey', 'monkey', '5991166d8d6d810058a29163').subscribe(created => {
//     console.log('created', created);
// });

// createTeamBossRole(teamDomain).subscribe(bossRoleCreated => {
//     console.log('bossRoleCreated', bossRoleCreated);
// });

// createTeamManagerRole(teamDomain).subscribe(managerRoleCreate => {
//     console.log('managerRoleCreate', managerRoleCreate);
// });

// createTeamRoomAdminRole(teamDomain).subscribe(roomAdminRole => {
//     console.log('managerRoleCreate', roomAdminRole);
// });

// createTeamMemberRole(teamDomain, config.PBTeamUserFields.receptionRole).subscribe(memberRoleCreated => {
//     console.log('memberRoleCreated', memberRoleCreated);
// });

// createTeamMemberRole(teamDomain, config.PBTeamUserFields.technicianRole).subscribe(memberRoleCreated => {
//     console.log('memberRoleCreated', memberRoleCreated);
// });

// createTeamMemberRole(teamDomain, config.PBTeamUserFields.casherRole).subscribe(memberRoleCreated => {
//     console.log('memberRoleCreated', memberRoleCreated);
// });

// createTeamRole(teamDomain).subscribe(teamRoleCreated => {
//     console.log('memberRoleCreated', teamRoleCreated);
// });
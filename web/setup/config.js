
var rxLeanCloud = require('rx-lean-js-core');
var rxjs = require('rxjs');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
var RxAVRole = rxLeanCloud.RxAVRole;

var saUsername = 'sa';
var saPassword = 'p@ssw0rd';
var saRoleName = 'sa';

var saACL = new RxAVACL();
saACL.setPublicWriteAccess(false);
saACL.setPublicReadAccess(true);
saACL.setRoleWriteAccess(saRoleName, true);

var teamName = 'kbsj';
var teamACL = new RxAVACL();
teamACL.setPublicWriteAccess(false);
teamACL.setRoleWriteAccess(teamName, true);
teamACL.setPublicWriteAccess(false);

var teamRoleName = 'kbsj';

function getTeamRoleQuery() {
    let query = new RxAVQuery('_Role');
    query.equalTo('name', teamRoleName);
    return query;
}

let teamObj = RxAVObject.createWithoutData('PBTeam', '598a7b6f570c350069a1c0f4');


function loggedInSA() {
    return RxAVUser.logIn(saUsername, saPassword);
}

function getSARole() {
    return RxAVRole.getByName(saRoleName);
}

String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const memberCommonProperties =
    [{
        objectName: 'PBMember',
        propertyName: 'nickName',
        description: '成员的昵称，团队内可见',
        propertyType: 'string',
        placeholder: 'nickName',
        category: 'member',
        subCategory: 'member',
        icon: 'account_circle',
        scope: 'app',
    }, {
        objectName: 'PBMember',
        propertyName: 'serial',
        description: '成员的编号，团队内可见',
        propertyType: 'string',
        placeholder: 'serial',
        category: 'member',
        subCategory: 'member',
        icon: 'domain',
        scope: 'app',
    }, {
        objectName: 'PBMember',
        propertyName: 'mobile',
        description: '成员的手机号，团队内可见',
        propertyType: 'string',
        placeholder: 'mobile',
        category: 'member',
        subCategory: 'member',
        icon: 'call',
        scope: 'app',
    }, {
        objectName: 'PBMember',
        propertyName: 'weixin',
        description: '成员的微信号，团队内可见',
        propertyType: 'string',
        placeholder: 'weixin',
        category: 'member',
        subCategory: 'member',
        icon: 'chat_bubble',
        scope: 'app',
    }];

const technicianBuiltInProperties = [
    {
        objectName: 'PBMember',
        propertyName: 'affiliation',
        description: '技师的归属接待',
        propertyType: 'Pointer',
        placeholder: 'affiliation',
        category: 'member',
        subCategory: 'member-technician',
        icon: 'group',
        scope: 'app',
    },
];

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

const PBPropertyFields = {
    className: 'PBProperty',
    objectName: 'objectName',
    propertyName: 'propertyName',
    description: 'description',
    propertyType: 'propertyType',
    placeholder: 'placeholder',
    category: 'category',
    subCategory: 'subCategory',
    icon: 'icon',
    scope: 'scope',
    valid: 'valid'
}

const PBRoomFields = {
    className: 'PBRoom',
    team: 'team',
    location: 'location',
    address: 'address',
    serial: 'serial',
};

const PBTicketFields = {
    className: 'PBTicket',
    serial: 'serial',
    team: 'team',
    reception: 'reception',
    serviceState: 'serviceState',
    shouldPay: 'shouldPay',
    actualPaid: 'actualPrice',
    room: 'room',
    waiter: 'waiter',
    paidWay: 'paidWay',
    serviceStateEnums: [
        {
            key: 'inProgress'
        }, {
            key: 'notStarted'
        }, {
            key: 'finished'
        }
    ],
    paidWayEnums: [
        {
            key: 'cash'
        }, {
            key: 'transfer'
        },
    ]
};

const PBTeamUserFields = {
    className: 'PBTeamUser',
    user: 'user',
    team: 'team',
    roles: 'roles',
    serial: 'serial',
    bossRole: 'boss',
    managerRole: 'manager',
    technicianRole: 'technician',
    receptionRole: 'reception',
    roomAdminRole: 'roomAdmin',
    casherRole: 'casher',
    roleConfig: [
        {
            key: 'boss',
            roleName: 'boss',
            serialPrefix: 'lb',
            roleSuffix: '_boss'
        },
        {
            key: 'manager',
            roleName: 'manager',
            serialPrefix: 'jl',
            roleSuffix: '_manager'
        },
        {
            key: 'technician',
            roleName: 'technician',
            serialPrefix: 'js',
            roleSuffix: '_technician'
        }, {
            key: 'roomAdmin',
            roleName: 'roomAdmin',
            serialPrefix: 'fg',
            roleSuffix: '_roomAdmin'
        }, {
            key: 'reception',
            roleName: 'reception',
            serialPrefix: 'js',
            roleSuffix: '_reception'
        }, {
            key: 'casher',
            roleName: 'casher',
            serialPrefix: 'sy',
            roleSuffix: '_casher'
        }
    ],
};



const PBProjectFields = {
    className: 'PBProject',
    team: 'team',
    name: 'name',
    serial: 'serial',
    price: 'price',
    demoPrice: [
        40, 60, 80, 100, 120, 150, 180, 200, 300, 400, 500
    ]
};

const PBProjectTechnicianFields = {
    className: 'PBProjectTechnician',
    team: 'team',
    technician: 'technician',
    project: 'project',
    deductPrice: 'deductPrice',
    demoDeductPercent: [
        0.4, 0.5, 0.6, 0.75, 0.8
    ]
};

const PBTeamFields = {
    className: 'PBTeam',
    name: 'name',
    domain: 'domain',
    paymentType: 'paymentType',
};

const PBServiceFields = {
    className: 'PBService',
    team: 'team',
    ticket: 'ticket',
    technician: 'technician',
    project: 'project',
};

const PBAffiliationFields = {
    className: 'PBAffiliation',
    team: 'team',
    technician: 'technician',
    reception: 'reception',
};

const PBRoomTechnicianFields = {
    className: 'PBRoomTechnician',
    team: 'team',
    technician: 'technician',
    room: 'room',
    admin: 'admin'
};

function getTechnicianQuery(count) {
    let technicianQuery = new RxAVQuery(PBTeamUserFields.className);
    technicianQuery.equalTo(PBTeamUserFields.team, teamObj);
    technicianQuery.containedIn(PBTeamUserFields.roles, [teamName + '_' + PBTeamUserFields.technicianRole]);
    technicianQuery.limit(count);
    return technicianQuery;
}

function getReceptionQuery(count) {
    let receptionQuery = new RxAVQuery(PBTeamUserFields.className);
    receptionQuery.equalTo(PBTeamUserFields.team, teamObj);
    receptionQuery.containedIn(PBTeamUserFields.roles, [teamName + '_' + PBTeamUserFields.receptionRole]);
    receptionQuery.limit(count);
    return receptionQuery;
}

function getPorjectQuery(count) {
    let projectQuery = new RxAVQuery(PBProjectFields.className);
    projectQuery.equalTo(PBProjectFields.team, teamObj);
    projectQuery.limit(count);
    return projectQuery;
}

function getTicketQuery(count) {
    let ticketQuery = new RxAVQuery(PBTicketFields.className);
    ticketQuery.equalTo(PBTicketFields.team, teamObj);
    ticketQuery.limit(count);
    return ticketQuery;
}

function getRoleName(teamDomain, roleKey) {
    if (roleKey) {
        let roleConfig = PBTeamUserFields.roleConfig.find(r => r.key == roleKey);
        let roleName = `${teamDomain}${roleConfig.roleSuffix}`;
        return roleName;
    }
    return teamDomain;
}

function getRoleObj(teamDomain, roleKey) {
    let roleName = getRoleName(teamDomain, roleKey);
    console.log('getRoleObj', roleName);
    return RxAVRole.getByName(roleName);
}

function getTeamACL(teamDomain, roleKey) {

    let roleName = getRoleName(teamDomain, roleKey);
    let roleACL = new RxAVACL();
    roleACL.setPublicReadAccess(false);
    roleACL.setPublicWriteAccess(false);

    roleACL.setRoleWriteAccess(roleName, true);
    roleACL.setRoleReadAccess(roleName, true);

    return roleACL;
}

function getTeamObj(teamDomain) {
    return loggedInSA().flatMap(loggedIn => {
        let teamQuery = new RxAVQuery(PBTeamFields.className);
        teamQuery.equalTo(PBTeamFields.domain, teamDomain);
        return teamQuery.find().map(list => {
            return list[0];
        });
    });
}

module.exports = {
    teamName: teamName,
    teamObj: teamObj,
    teamACL: teamACL,
    getTeamACL: getTeamACL,
    saRoleName: saRoleName,
    saACL: saACL,
    getSARole: getSARole,
    PBPaymentTypeFields: PBPaymentTypeFields,
    PBTeamFields: PBTeamFields,
    PBTeamUserFields: PBTeamUserFields,
    PBProjectFields: PBProjectFields,
    PBProjectTechnicianFields: PBProjectTechnicianFields,
    PBTicketFields: PBTicketFields,
    PBPropertyFields: PBPropertyFields,
    PBAffiliationFields: PBAffiliationFields,
    PBServiceFields: PBServiceFields,
    PBRoomFields: PBRoomFields,
    memberCommonProperties: memberCommonProperties,
    technicianBuiltInProperties: technicianBuiltInProperties,
    getRandomInt: getRandomInt,
    getTechnicianQuery: getTechnicianQuery,
    getPorjectQuery: getPorjectQuery,
    getTicketQuery: getTicketQuery,
    getReceptionQuery: getReceptionQuery,
    getTeamRoleQuery: getTeamRoleQuery,
    loggedInSA: loggedInSA,
    getRoleName: getRoleName,
    getRoleObj: getRoleObj,
    getTeamObj: getTeamObj
}
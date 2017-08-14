var rxLeanCloud = require('rx-lean-js-core');
var rxjs = require('rxjs');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
require('./appConfig');
var tool = require('./tool');
var config = require('./config');


/**
 * 
 */
function generateProjects(count) {
    let projectObjs = [];
    for (let i = 0; i < count; i++) {
        let projectObj = new RxAVObject(config.PBProjectFields.className);
        projectObj.set(config.PBProjectFields.team, config.teamObj);
        let projectName = tool.randomUpper(4);
        projectObj.set(config.PBProjectFields.name, projectName);
        let demoPrice = config.PBProjectFields.demoPrice.random();
        projectObj.set(config.PBProjectFields.price, demoPrice);
        projectObj.ACL = config.teamACL;
        projectObjs.push(projectObj);
    }
    return projectObjs;
}

function initProjects() {
    let objs = generateProjects(10);
    return RxAVObject.saveAll(objs);
}

initProjects().subscribe(created => {
    console.log('created', created);
});

var rxLeanCloud = require('rx-lean-js-core');
var rxjs = require('rxjs');
var RxAVObject = rxLeanCloud.RxAVObject;
var RxAVACL = rxLeanCloud.RxAVACL;
var RxAVQuery = rxLeanCloud.RxAVQuery;
var RxAVUser = rxLeanCloud.RxAVUser;
require('./appConfig');
var tool = require('./tool');
var config = require('./config');


function generateProjectTechnicians(technicianLimit, projectLimit) {
    let technicianQuery = config.getTechnicianQuery(technicianLimit);
    let projectQuery = config.getPorjectQuery(projectLimit);

    return technicianQuery.find().concatMap(ev => projectQuery.find(), (x, y) => {
        let result = [];
        x.forEach(t => {
            y.forEach(p => {
                let project_technician_obj = new RxAVObject(config.PBProjectTechnicianFields.className);
                project_technician_obj.ACL = config.teamACL;
                project_technician_obj.set(config.PBProjectTechnicianFields.team, config.teamObj);
                project_technician_obj.set(config.PBProjectTechnicianFields.technician, t);
                project_technician_obj.set(config.PBProjectTechnicianFields.project, p);
                let randomDedcutPrice = config.PBProjectTechnicianFields.demoDeductPercent.random() * p.get(config.PBProjectFields.price);
                project_technician_obj.set(config.PBProjectTechnicianFields.deductPrice, randomDedcutPrice);
                result.push(project_technician_obj);
            });
        });
        return result;
    });
}

function initProjectTechnicians() {
    return generateProjectTechnicians(30, 10).flatMap(generated => {
        return RxAVObject.saveAll(generated);
    });
}

initProjectTechnicians().subscribe(successd => {
    console.log('successd', successd);
});
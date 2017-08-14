import { PBObject } from './PBObject';
import { Observable } from 'rxjs';

import { PBTeamUserFields } from './PBTeamUser';
import { PBProject } from './PBProject';
import { PBMember } from './PBMember';
import { PBProjectTechnician, PBProjectTechnicianFields } from './PBProjectTechnician';
import { RxAVObject, RxAVACL, RxAVRole, RxAVQuery } from 'rx-lean-js-core';

export class PBService extends PBObject {

    constructor(serviceObj: RxAVObject) {
        super(serviceObj);
    }

    deductQuery() {
        let query = new RxAVQuery(PBProjectTechnicianFields.className);
        query.equalTo(PBProjectTechnicianFields.project, this.pbProject.metaData);
        query.equalTo(PBProjectTechnicianFields.technician, this.pbTechnician.metaData);
        query.include(PBServiceFields.project, PBServiceFields.technician);
        return query.find().map(list => {
            if (list.length > 0) {
                let pbProjectTechnicianObj = list[0];
                this._pbProjectTechnician = new PBProjectTechnician(pbProjectTechnicianObj);

                console.log('PBProjectTechnician loaded');
            }
        });
    }

    load() {
        this.deductQuery().subscribe(() => {

        });
    }

    // _pbWaiterMember: PBMember;
    // get pbWaiterMember(): PBMember {
    //     if (this._pbWaiterMember == undefined) {
    //         this._pbWaiterMember = new PBMember(this.waiter);
    //     }
    //     return this._pbWaiterMember;
    // }

    get price() {
        if (this.pbProject == undefined) return 0;
        return this.pbProject.price;
    }

    get deduct() {
        if (this._pbProjectTechnician == undefined) return 0;
        return this._pbProjectTechnician.deductPrice;
    }

    _pbProjectTechnician: PBProjectTechnician;


    get projectSerial() {
        return this.pbProject.serial;
    }

    get projectName() {
        return this.pbProject.name;
    }

    _pbProject: PBProject;
    get pbProject() {
        if (this._pbProject == undefined) {
            this._pbProject = new PBProject(this.project);
        }
        return this._pbProject;
    }

    get project() {
        return this.metaData.get(PBServiceFields.project);
    }

    get technicianSerial() {
        return this.pbTechnician.serial;
    }

    _pbTechnician: PBMember;
    get pbTechnician() {
        if (this._pbTechnician == undefined) {
            this._pbTechnician = new PBMember(this.technician);
        }
        return this._pbTechnician;
    }

    get technician() {
        return this.metaData.get(PBServiceFields.technician);
    }

}

export const PBServiceFields = {
    className: 'PBService',
    team: 'team',
    ticket: 'ticket',
    technician: 'technician',
    project: 'project',
};
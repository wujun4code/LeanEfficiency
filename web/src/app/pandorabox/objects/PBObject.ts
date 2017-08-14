import { RxAVObject } from 'rx-lean-js-core';
import { Observable } from 'rxjs';

export class PBObject {
    private _metaData: RxAVObject;
    constructor(serverObj: RxAVObject) {
        this.metaData = serverObj;
    }

    get id() {
        return this.metaData.objectId;
    }

    get metaData() {
        return this._metaData;
    }

    set metaData(v: RxAVObject) {
        this._metaData = v;
    }

    refresh() {
        if (this.metaData.objectId != undefined || this.metaData.objectId != '')
            this.metaData.fetch().subscribe(fetched => {
                console.log('ModelBase refreshed.', this.metaData.className, this.metaData.objectId);
            });
    }

    save() {
        return this.metaData.save();
    }
    delete() {
        return this.metaData.delete();
    }
    copy() {

    }
    get(key: string) {
        return this[key];
    }
}

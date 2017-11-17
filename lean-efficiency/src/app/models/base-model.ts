import { RxAVObject } from 'rx-lean-js-core';

export class BaseModel {
    private _metaData: RxAVObject;
    constructor(serverObj: RxAVObject) {
        this.metaData = serverObj;
    }
    get metaData() {
        return this._metaData;
    }
    set metaData(v: RxAVObject) {
        this._metaData = v;
    }
}
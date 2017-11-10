import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from '../models';

@Injectable()
export class UserService {
    _mockContacts: Array<UserModel> = [];
    constructor() {
        this.initMockData();
    }
    public current(): Observable<UserModel> {
        return Observable.from([this.devUser]);
    }

    get devUser(): UserModel {
        let junwu = new UserModel();
        junwu.avatar = 'assets/img/junwu.png';
        junwu.clientId = 'junwu';
        junwu.email = 'jun.wu@leancloud.rocks';
        junwu.id = 'xxx';
        junwu.mobile = '18612438929';
        junwu.usernameHex = 'junwu';
        return junwu;
    }


    initMockData() {
        let current = this.devUser;

        let wchen = new UserModel();
        wchen.avatar = 'assets/img/wchen.png';
        wchen.clientId = 'wchen';
        wchen.email = 'wchen@leancloud.rocks';
        wchen.id = '111';
        wchen.usernameHex = 'wchen';
        wchen.mobile = '15658580412';

        let hjiang = new UserModel();
        hjiang.avatar = 'assets/img/hjiang.png';
        hjiang.clientId = 'hjiang';
        hjiang.email = 'hjiang@leancloud.rocks';
        hjiang.id = '222';
        hjiang.usernameHex = 'hjiang';
        hjiang.mobile = '13812345678';

        let ttang = new UserModel();
        ttang.avatar = 'assets/img/ttang.png';
        ttang.clientId = 'ttang';
        ttang.email = 'ttang@leancloud.rocks';
        ttang.id = '333';
        ttang.mobile = '18888888888';
        ttang.usernameHex = 'ttang';

        this._mockContacts.push(current, wchen, hjiang, ttang);
    }

    get mockContacts() {
        return this._mockContacts;
    }

    contact(userId: string) {
        console.log('userId', userId, this.mockContacts);
        return this.mockContacts.find(user => user.id == userId || user.usernameHex == userId);
    }
}
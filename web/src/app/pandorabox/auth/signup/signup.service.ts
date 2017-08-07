import { Injectable } from '@angular/core';
import { RxAVUser } from 'rx-lean-js-core';
import { Observable } from 'rxjs';
import { PBUser } from '../../objects';
import { StringUtils } from '../../services/stringUtils';

export interface ISignUpService {
    createUser(options: any): Observable<PBUser>;
}

@Injectable()
export class DefaultSignUpService implements ISignUpService {
    constructor(public stringUtils: StringUtils) {

    }

    getUser(options: any) {
        let username = options.username || options.mobile;
        let password = options.pwd || options.password;
        let mobile = options.mobile || options.phone || options.mobilephone;

        let user = new RxAVUser();
        user.username = username;
        user.mobilephone = mobile;
        user.password = password;
        return user;
    }

    createUser(options: any): Observable<PBUser> {
        let user = this.getUser(options);
        return user.create().map(success => {
            return new PBUser(user);
        });
    }

    currentUser(options?: any) {
        return RxAVUser.current(options).map(user => {
            if (user != undefined && user != null)
                return new PBUser(user);
            return undefined;
        });
    }

    signUpUser(options: any): Observable<PBUser> {
        let user = this.getUser(options);
        return user.signUp().map(success => {
            return new PBUser(user);
        });
    }
}
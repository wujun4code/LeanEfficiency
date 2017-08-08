import { Injectable } from '@angular/core';
import { RxAVUser } from 'rx-lean-js-core';
import { Observable } from 'rxjs';
import { PBUser } from '../../objects';
import { StringUtils } from '../../services/stringUtils';
import { DefaultAuthService } from '../auth.service';

export interface ISignUpService {
    createUser(options: any): Observable<PBUser>;
}

@Injectable()
export class DefaultSignUpService implements ISignUpService {
    constructor(public stringUtils: StringUtils,
        public authService: DefaultAuthService) {

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
        return this.authService.currentUser();
    }

    signUpUser(options: any): Observable<PBUser> {
        let user = this.getUser(options);
        return user.signUp().map(success => {
            return new PBUser(user);
        });
    }
}
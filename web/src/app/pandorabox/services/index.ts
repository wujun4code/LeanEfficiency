import { DefaultSignUpService } from '../auth/signup/signup.service';
import { DefaultAuthService } from '../auth/auth.service';
import { StringUtils } from './stringUtils';
import { DefaultTeamService } from '../team'

export const services =
    [
        DefaultSignUpService,
        DefaultAuthService,
        StringUtils,
        DefaultTeamService
    ];
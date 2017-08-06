import { DefaultSignUpService } from '../auth/signup/signup.service';
import { StringUtils } from './stringUtils';
import { DefaultTeamService } from '../team'

export const services =
    [
        DefaultSignUpService,
        StringUtils,
        DefaultTeamService
    ];
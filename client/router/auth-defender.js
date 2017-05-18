import {Authentication} from "../auth/authentication";
export class AuthDefender {
    static canActivate() {
        return Authentication.instance.auth;
    }
}

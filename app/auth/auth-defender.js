import {Authentication} from "./authentication";
export class AuthDefender {
    static canActivate() {
        return Authentication.instance.auth;
    }
}

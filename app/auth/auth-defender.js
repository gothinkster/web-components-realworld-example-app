import {Authentication} from "./authentication.js";

export class AuthDefender {
    static canActivate() {
        return Authentication.instance.auth;
    }
}

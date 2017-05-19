import {Authentication} from "../auth/authentication";
import {config} from '../config';

export class Http {
    constructor() {
        if (!Http.inst) {
            Http.inst = this;
        } else {
            throw new Error('use instance');
        }

        return Http.inst;
    }

    static get instance() {
        return Http.inst;
    }

    doGet(path, authentication) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        };

        if(authentication === true) {
            headers['Authorization'] = 'Token ' + Authentication.instance.auth.token;
        }
        return fetch(config.rest_url + path, {
            headers: headers
        });
    }
}
Http.inst = null;

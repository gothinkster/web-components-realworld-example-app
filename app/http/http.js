import {Authentication} from "../auth/authentication";
import {config} from "../config";
import {RouterHandler} from "../router/router-handler";

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

        if (authentication === true) {
            const auth = Authentication.instance.auth;
            if(auth) {
                headers['Authorization'] = 'Token ' + auth.token;
            }
        }
        return fetch(config.rest_url + path, {
            headers: headers
        });
    }

    doPost(path, body, authentication) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        };

        if (authentication === true) {
            const auth = Authentication.instance.auth;
            var token = null;
            if (auth) {
                token = auth.token;
            } else {
                //stop immediately
                RouterHandler.instance.router.navigate('#/login');
                return new Promise((resolve, rej) => {
                    rej();
                });
            }
            headers['Authorization'] = 'Token ' + token;
        }
        return fetch(config.rest_url + path, {
            headers: headers,
            method: 'POST',
            body: body
        }).then(response => {
            if (response.status === 401) {
                RouterHandler.instance.router.navigate('#/login');
            }
            return response.json();
        });
    }

    doPut(path, body, authentication) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        };

        if (authentication === true) {
            const auth = Authentication.instance.auth;
            var token = null;
            if (auth) {
                token = auth.token;
            } else {
                //stop immediately
                RouterHandler.instance.router.navigate('#/login');
                return new Promise((resolve, rej) => {
                    rej();
                });
            }
            headers['Authorization'] = 'Token ' + token;
        }
        return fetch(config.rest_url + path, {
            headers: headers,
            method: 'PUT',
            body: body
        }).then(response => {
            if (response.status === 401) {
                RouterHandler.instance.router.navigate('#/login');
            }
            return response.json();
        });
    }

    doDelete(path, authentication) {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        };

        if (authentication === true) {
            const auth = Authentication.instance.auth;
            var token = null;
            if (auth) {
                token = auth.token;
            }
            headers['Authorization'] = 'Token ' + token;
        }

        return fetch(config.rest_url + path, {
            headers: headers,
            method: 'DELETE'
        }).then(function (response) {
            if (response.status === 401) {
                RouterHandler.instance.router.navigate('#/login');
            }
            return response.json();
        });
    }
}
Http.inst = null;

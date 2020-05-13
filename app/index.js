import "@webcomponents/webcomponentsjs/webcomponents-lite";
import {RouterHandler} from "./router/router-handler.js";
import {Authentication} from "./auth/authentication.js";
import {Core} from "./core/core.js";
import {Http} from "./http/http.js";

/**
 * Order is important !
 */
class App {
    constructor() {
        new Authentication();
        const router = new RouterHandler();
        new Core();
        new Http();
        router.init();
    }
}

if ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
    // platform is good!
    new App();
} else {
    setTimeout(() => {
        new App();
    });
}

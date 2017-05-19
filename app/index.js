import {RouterHandler} from "./router/router-handler";
import {Authentication} from "./auth/authentication";
import {Core} from "./core/core";
import {Http} from "./http/http";

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

new App();

import {HomeComponent} from "../pages/home.comp";
import {CLoginComponent} from "../pages/login.comp";
export class RouterHandler {
    constructor() {
        var pushState = history.pushState;
        history.pushState = function (state, a, b) {
            if (typeof history.onpushstate == "function") {
                history.onpushstate({state: state}, a, b);
            }
            return pushState.apply(history, arguments);
        };

        window.onpopstate = history.onpushstate = (state, a, url) => {
            let routeTo = null;
            if (state.state != null && state.state.route != undefined) {
                routeTo = state.state.route;
            } else if(url != undefined) {
                routeTo = url;
            }
            RouterHandler.handleButtonChanges(routeTo);
            RouterHandler._onChangeCallbacks.forEach(c => {
                c(routeTo);
            });
            // }
        };
    }

    static onChange(callback) {
        RouterHandler._onChangeCallbacks.push(callback);
    }

    static handleButtonChanges(url) {
        let page = null;

        if (url == undefined || url == '/') {
            page = new HomeComponent();
        } else {
            page = new CLoginComponent();
        }
        const outlet = document.querySelector('router-outlet');
        while (outlet.firstChild) {
            outlet.removeChild(outlet.firstChild);
        }
        outlet.appendChild(page);
    }

    static navigate(url) {
        let page = null;

        if (url == '/') {
            page = new HomeComponent();
        } else {
            page = new CLoginComponent();
        }
        const outlet = document.querySelector('router-outlet');
        while (outlet.firstChild) {
            outlet.removeChild(outlet.firstChild);
        }
        // history.pushState({}, null, url);
        outlet.appendChild(page);
    }
}
RouterHandler._onChangeCallbacks = [];
new RouterHandler();
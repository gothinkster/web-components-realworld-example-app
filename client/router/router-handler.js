import {HomeComponent} from "../pages/home.comp";
import {CLoginComponent} from "../pages/login.comp";
import {CRegisterComponent} from "../pages/register.comp";
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
            RouterHandler.navigate(routeTo);
            RouterHandler._onChangeCallbacks.forEach(c => {
                c(routeTo);
            });
        };
    }

    static onChange(callback) {
        RouterHandler._onChangeCallbacks.push(callback);
    }

    static navigate(url) {
        let page = null;

        if (url == '/login') {
            page = new CLoginComponent();
        } else if(url == '/register') {
            page = new CRegisterComponent();
        } else {
            page = new HomeComponent();
        }
        const outlet = document.querySelector('router-outlet');
        while (outlet.firstChild) {
            outlet.removeChild(outlet.firstChild);
        }
        outlet.appendChild(page);
    }
}
RouterHandler._onChangeCallbacks = [];
new RouterHandler();
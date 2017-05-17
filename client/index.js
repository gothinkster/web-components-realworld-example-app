import {layoutComponents} from "./components/layout/index";
import {ArticleComponent} from "./components/article.comp";
import {HomeComponent} from "./pages/home.comp";
import {RouterOutlet} from "./router/router-outlet";
import {ComponentRegistry} from "./component-registry";
import {RouterHandler} from "./router/router-handler";


class App {
    constructor() {
        const url = location.pathname;
        const routerHandler = new RouterHandler();
        console.log(url);
        const components = [
            ...layoutComponents,
            {
                tagName: 'c-article',
                component: ArticleComponent
            },
            {
                tagName: 'router-outlet',
                component: RouterOutlet
            },
            {
                tagName: 'c-home',
                component: HomeComponent
            }
        ];
        ComponentRegistry.register(components);

        let n = new HomeComponent();
        const outlet = document.querySelector('router-outlet');
        while (outlet.firstChild) {
            outlet.removeChild(outlet.firstChild);
        }
        outlet.appendChild(n);




        // console.log(globalFeed);
    }

}

new App();

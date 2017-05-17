import {layoutComponents} from "./components/layout/index";
import {ArticleComponent} from "./components/article.comp";
import {HomeComponent} from "./pages/home.comp";
import {CLoginComponent} from "./pages/login.comp";
import {CRegisterComponent} from "./pages/register.comp";
import {RouterOutlet} from "./router/router-outlet";
import {ComponentRegistry} from "./component-registry";
import {RouterHandler} from "./router/router-handler";


class App {
    constructor() {
        this.registerComponents();

        const url = location.pathname;
        RouterHandler.navigate(url);

        // console.log(globalFeed);
    }

    registerComponents() {
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
            },
            {
                tagName: 'c-login',
                component: CLoginComponent
            },
            {
                tagName: 'c-register',
                component: CRegisterComponent
            }
        ];
        ComponentRegistry.register(components);
    }

}

new App();

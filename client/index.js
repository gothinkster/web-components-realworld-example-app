import {layoutComponents} from "./components/layout/index";
import {ArticleComponent} from "./components/article.comp";
import {HomeComponent} from "./pages/home.comp";
import {CLoginComponent} from "./pages/login.comp";
import {CRegisterComponent} from "./pages/register.comp";
import {RouterOutlet} from "./router/router-outlet";
import {ComponentRegistry} from "./component-registry";
import {RouterHandler} from "./router/router-handler";
import {ProfileComponent} from "./pages/profile.comp";
import {ArticlePreviewComponent} from "./pages/article-preview.comp";

class App {
    constructor() {
        this.registerComponents();
        RouterHandler.getInstance.init();
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
            },
            {
                tagName: 'c-profile',
                component: ProfileComponent
            },
            {
                tagName: 'article-preview',
                component: ArticlePreviewComponent
            }
        ];
        ComponentRegistry.register(components);
    }

}

new App();

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
import {CommentPreviewComponent} from "./components/comment-preview.comp";
import {Authentication} from "./auth/authentication";
import {EditorComponent} from "./pages/editor.comp";
import {SettingsComponent} from "./pages/settings.comp";
import {PopularTagsComponent} from "./components/popular-tags.comp";

class App {
    constructor() {
        new Authentication();
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
            },
            {
                tagName: 'comment-preview',
                component: CommentPreviewComponent
            },
            {
                tagName: 'c-editor',
                component: EditorComponent
            },
            {
                tagName: 'c-settings',
                component: SettingsComponent
            },
            {
                tagName: 'popular-tags',
                component: PopularTagsComponent
            }
        ];
        ComponentRegistry.register(components);
    }

}

new App();

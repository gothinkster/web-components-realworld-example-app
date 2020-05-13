import {layoutComponents} from "../components/layout/index";
import {ArticleComponent} from "../components/article.comp";
import {HomeComponent} from "../pages/home.comp";
import {CLoginComponent} from "../pages/login.comp";
import {CRegisterComponent} from "../pages/register.comp";
import {RouterOutlet} from "../router/router-outlet";
import {ComponentRegistry} from "./component-registry";
import {ProfileComponent} from "../pages/profile.comp";
import {CommentPreviewComponent} from "../components/comment-preview.comp";
import {EditorComponent} from "../pages/editor.comp";
import {SettingsComponent} from "../pages/settings.comp";
import {PopularTagsComponent} from "../components/popular-tags.comp";
import {CommentsContainerComponent} from "../components/comments-container.comp";
import {UserInfoComponent} from "../components/user-info.comp";
import {ArticlePreviewBannerComponent} from "../components/article-preview-banner";
import {CommentCreateComponent} from "../components/comment-create.comp";

export class Core {
    constructor() {
        if (!Core.inst) {
            Core.inst = this;
        } else {
            throw new Error('use instance');
        }

        ComponentRegistry.register(components);

        return Core.inst;
    }

    static get instance() {
        return Core.inst;
    }
}
Core.inst = null;

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
        tagName: 'comment-preview',
        component: CommentPreviewComponent
    },
    {
        tagName: 'comments-container',
        component: CommentsContainerComponent
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
    },
    {
        tagName: 'user-info',
        component: UserInfoComponent
    },
    {
        tagName: 'article-preview-banner',
        component: ArticlePreviewBannerComponent
    },
    {
        tagName: 'comment-create',
        component: CommentCreateComponent
    }
];

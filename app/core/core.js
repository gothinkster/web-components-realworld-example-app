import {layoutComponents} from "../components/layout/index.js";
import {ArticleComponent} from "../components/article.comp.js";
import {HomeComponent} from "../pages/home.comp.js";
import {CLoginComponent} from "../pages/login.comp.js";
import {CRegisterComponent} from "../pages/register.comp.js";
import {RouterOutlet} from "../router/router-outlet.js";
import {ComponentRegistry} from "./component-registry.js";
import {ProfileComponent} from "../pages/profile.comp.js";
import {CommentPreviewComponent} from "../components/comment-preview.comp.js";
import {EditorComponent} from "../pages/editor.comp.js";
import {SettingsComponent} from "../pages/settings.comp.js";
import {PopularTagsComponent} from "../components/popular-tags.comp.js";
import {CommentsContainerComponent} from "../components/comments-container.comp.js";
import {UserInfoComponent} from "../components/user-info.comp.js";
import {ArticlePreviewBannerComponent} from "../components/article-preview-banner.js";
import {CommentCreateComponent} from "../components/comment-create.comp.js";

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

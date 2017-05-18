var Navigo = require('navigo');
import {CLoginComponent} from "../pages/login.comp";
import {ArticlePreviewComponent} from "../pages/article-preview.comp";
import {ProfileComponent} from "../pages/profile.comp";
import {CRegisterComponent} from "../pages/register.comp";
import {HomeComponent} from "../pages/home.comp";


export class RouterHandler {
    constructor() {
        if (!RouterHandler.instance) {
            RouterHandler.instance = this;
        } else {
            throw new Error('use getInstance');
        }

        var root = null;
        var useHash = true;
        var hash = '#';
        this.router = new Navigo(root, useHash, hash);
        return RouterHandler.instance;
    }

    static get getInstance() {
        return RouterHandler.instance;
    }

    static inject(component) {
        const outlet = document.querySelector('router-outlet');
        while (outlet.firstChild) {
            outlet.removeChild(outlet.firstChild);
        }
        outlet.appendChild(component);
    }

    init() {
        this.router.on(
            {
                '/login': () => {
                    RouterHandler.inject(new CLoginComponent())
                },
                '/register': () => {
                    RouterHandler.inject(new CRegisterComponent())
                },
                '/profile/:username': (params) => {
                    RouterHandler.inject(new ProfileComponent(params))
                },
                '/article/:slug': (params) => {
                    RouterHandler.inject(new ArticlePreviewComponent(params));
                },
                '': () => {
                    RouterHandler.inject(new HomeComponent())
                }
            }
        ).resolve();

        // this.router.updatePageLinks();
    }
}
RouterHandler.instance = null;
new RouterHandler();


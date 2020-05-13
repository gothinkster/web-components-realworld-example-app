var Navigo = require('navigo');
import {CLoginComponent} from "../pages/login.comp.js";
import {AuthDefender} from "../auth/auth-defender.js";
import {SettingsComponent} from "../pages/settings.comp.js";
import {EditorComponent} from "../pages/editor.comp.js";
import {ProfileComponent} from "../pages/profile.comp.js";
import {CRegisterComponent} from "../pages/register.comp.js";
import {HomeComponent} from "../pages/home.comp.js";


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
        const routes = [
            {path: '/settings', resolve: SettingsComponent, canActivate: AuthDefender.canActivate},
            {path: '/login', resolve: CLoginComponent},
            {path: '/register', resolve: CRegisterComponent},
            {path: '/profile/:username', resolve: ProfileComponent},
            {path: '/editor/:slug', resolve: EditorComponent, canActivate: AuthDefender.canActivate},
            {path: '/editor', resolve: EditorComponent, canActivate: AuthDefender.canActivate}
        ];

        this.router.on(() => {
            RouterHandler.inject(new HomeComponent())
        }).resolve();

        this.router.on(
        '/article/:slug',
        (params) => {
            import('../pages/article-preview.comp.js').then((Component) =>
                RouterHandler.inject(new Component.default(params))
            );
        }).resolve();

        routes.forEach(route => {
            this.router.on(
                route.path,
                (params) => {
                    RouterHandler.inject(new route.resolve(params))
                },
                {
                    before: (done, params) => {
                        if (!route.canActivate || route.canActivate()) {
                            done();
                        } else {
                            this.router.navigate('/');
                            done(false);
                        }
                    }
                }
            ).resolve();
        });

    }
}
RouterHandler.instance = null;


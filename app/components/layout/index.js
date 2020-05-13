import {CNavComponent} from "./c-nav.comp.js";
import {CFooterComponent} from "./c-footer.comp.js";
import {CBannerComponent} from "./c-banner.comp.js";

export const layoutComponents = [
    {
        tagName: 'c-nav',
        component: CNavComponent
    },
    {
        tagName: 'c-footer',
        component: CFooterComponent
    },
    {
        tagName: 'c-banner',
        component: CBannerComponent
    }
];

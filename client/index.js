import {layoutComponents} from "./components/layout/index";
import {ArticleComponent} from "./components/article.comp";
import {ComponentRegistry} from "./component-registry";
class App {
    constructor() {
        let url = location.href;
        console.log(url);
        const components = [
            ...layoutComponents,
            {
                tagName: 'c-article',
                component: ArticleComponent
            }
        ];
        ComponentRegistry.register(components);


        // let n = new NasvbarComponent();
        // document.body.appendChild(n);
        // console.log('aaaa');
        // https://conduit.productionready.io/api/articles
        fetch('https://conduit.productionready.io/api/articles').then(function(response) {
            return response.json();
        }).then(r => {
            console.log(r);
        });
    }
}

new App();

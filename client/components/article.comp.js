import {X_Component} from "./component.dec";
"use strict";
//
// const model = {
//     author: 'admir'
// };

@X_Component({
    templateUrl: 'client/components/article.comp.html',
    model: {}
})
export class ArticleComponent extends HTMLElement {

    constructor() {
        super();
        this.model = {
            author: '',
            heart: 0
        };

        this.parsedElem = null;
    }

    static get observedAttributes() {
        return ["author"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name);
    }

    connectedCallback() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        ArticleComponent.template(this.model).then(e => {
            this.appendChild(e());
            var btn = this.querySelector('#ion-heart');
            btn.addEventListener('click',() => {
                this.updateHearts();
            });
        });
    }

    updateHearts() {
        var span = this.querySelector('#ion-heart > span');
        this.model.favoritesCount = this.model.favoritesCount + 1;
        span.innerHTML = this.model.favoritesCount;
    }


    renderComponent() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        ArticleComponent.template(this.model).then(e => {
            this.appendChild(e());
        });
    }

    test() {
       alert('a');
    }


}

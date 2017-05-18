import {X_Component} from "./component.dec";
import {RouterHandler} from "../router/router-handler";
"use strict";

@X_Component({
    templateUrl: 'components/article.comp.html'
})
export class ArticleComponent extends HTMLElement {

    constructor() {
        super();
        this.model = {
            author: '',
            heart: 0
        };
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name);
    }

    disconnectedCallback() {
        console.log('disconnected');
        const button = this.querySelector('#ion-heart');
        button.removeEventListener('click', this.updateHearts.bind(this));
    }

    connectedCallback() {
        this.innerHTML = this.render();
        const button = this.querySelector('#ion-heart');
        button.addEventListener('click', this.updateHearts.bind(this));

        const authorButton = this.querySelector('#author');
        authorButton.addEventListener('click', (e) => {
            e.preventDefault();
            RouterHandler.getInstance.router.navigate(authorButton.getAttribute('href'));
        });

        const previewLink = document.getElementById('preview-link');
        previewLink.addEventListener('click', (e) => {
            e.preventDefault();
            RouterHandler.getInstance.router.navigate(previewLink.getAttribute('href'));
        });


    }


    updateHearts() {
        var span = this.querySelector('#ion-heart > span');
        this.model.favoritesCount = this.model.favoritesCount + 1;
        span.innerHTML = this.model.favoritesCount;
    }


    render() {
        return `
            <div class="article-preview">
                <div class="article-meta">
                    <a href="profile.html">
                        <img src="${this.model.author.image}"/>
                    </a>
                    <div class="info">
                        <a id="author" href="/profile/${this.model.author.username}" class="author">${this.model.author.username}</a>
                        <span class="date">${this.model.createdAt}</span>
                    </div>
                    <button id="ion-heart" class="btn btn-outline-primary btn-sm pull-xs-right">
                        <i class="ion-heart"></i> <span>${this.model.favoritesCount}</span>
                    </button>
                </div>
                <a id="preview-link" href="#/article/${this.model.slug}" class="preview-link">
                    <h1>${this.model.title}</h1>
                    <p>${this.model.description}</p>
                    <span>Read more...</span>
                    <ul class="tag-list">
                        <li class="tag-default tag-pill tag-outline">
                            well
                        </li>
                        <li class="tag-default tag-pill tag-outline">
                            well
                        </li>
                    </ul>
                </a>
            </div>
        `;
    }

}

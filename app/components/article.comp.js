import {RouterHandler} from "../router/router-handler.js";
import {Http} from "../http/http.js";
import {formatDate} from "../date-util.js";

export class ArticleComponent extends HTMLElement {
    constructor() {
        super();
        this.model = {
            author: '',
            heart: 0
        };
        this.updateHearts = this.updateHearts.bind(this);
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    disconnectedCallback() {
        const button = this.querySelector('#ion-heart');
        button.removeEventListener('click', this.updateHearts);
    }

    connectedCallback() {
        this.innerHTML = this.render();
        const button = this.querySelector('#ion-heart');
        button.addEventListener('click', this.updateHearts);

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


    updateHearts(e) {
        e.preventDefault();
        if (this.model.favorited) {
            this.unfavoritArticle();
        } else {
            this.favoriteArticle();
        }
    }


    favoriteArticle() {
        Http.instance.doPost('/articles/' + this.model.slug + '/favorite', JSON.stringify({}), true).then(r => {
            this.model.favorited = r.article.favorited;
            var span = this.querySelector('#ion-heart > span');
            span.parentNode.classList.add('active');
            this.model.favoritesCount = this.model.favoritesCount + 1;
            span.innerHTML = this.model.favoritesCount;
        });
    }

    unfavoritArticle() {
        Http.instance.doDelete('/articles/' + this.model.slug + '/favorite', true).then(r => {
            this.model.favorited = r.article.favorited;
            var span = this.querySelector('#ion-heart > span');
            this.model.favoritesCount = this.model.favoritesCount - 1;
            span.parentNode.classList.remove('active');
            span.innerHTML = this.model.favoritesCount;
        });
    }


    render() {
        return `
<div class="article-preview">
    <div class="article-meta">
        <a href="#/profile/${this.model.author.username}">
            <img src="${this.model.author.image}"/>
        </a>
        <div class="info">
            <a id="author" href="#/profile/${this.model.author.username}" class="author">${this.model.author.username}</a>
            <span class="date">${formatDate(this.model.createdAt)}</span>
        </div>
        <button id="ion-heart" class="btn btn-outline-primary btn-sm pull-xs-right ${this.model.favorited ? 'active' : ''}">
            <i class="ion-heart"></i> <span>${this.model.favoritesCount}</span>
        </button>
    </div>
    <a id="preview-link" href="#/article/${this.model.slug}" class="preview-link">
        <h1>${this.model.title}</h1>
        <p>${this.model.description ? this.model.description : ''}</p>
        <span>Read more...</span>
        <ul class="tag-list">
            ${this.model.tagList.map(tag => {
            return `
                <li class="tag-default tag-pill tag-outline">
                ${tag}
                </li>
                `;
        }).join(' ')}
        </ul>
    </a>
</div>
        `;
    }

}

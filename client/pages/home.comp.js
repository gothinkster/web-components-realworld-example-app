import {X_Component} from "../components/component.dec";
import {ArticleComponent} from "../components/article.comp";
"use strict";

@X_Component({
    templateUrl: 'pages/home.comp.html'
})
export class HomeComponent extends HTMLElement {
    constructor() {
        super();
        // this.shadow = this.createShadowRoot();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        location.href = '#/';
        HomeComponent.template({}).then(el => {

            this.appendChild(el());

            const globalFeed = document.getElementById('globalFeed');
            this.fetchAndGenerateGlobalFeed(globalFeed);

            this.popularTags();

            const globalFeedButton = this.querySelector('#globalFeedButton');
            globalFeedButton.addEventListener('click', () => {
                this.removeCurrentTagFilter();
                globalFeedButton.classList.add('active');
                this.cleanGlobalFeed();
                this.fetchAndGenerateGlobalFeed(globalFeed);
            });
        });
    }

    fetchAndGenerateGlobalFeed(globalFeed) {
        fetch('https://conduit.productionready.io/api/articles').then(function (response) {
            return response.json();
        }).then(r => {
            this.cleanGlobalFeed();
            r.articles.forEach(article => {
                this.generateArticle(article, globalFeed);
            });
        });
    }

    generateArticle(article, globalFeed) {
        if (!article.author.image) {
            article.author.image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
        }
        let articleComponent = new ArticleComponent();
        articleComponent.model = article;
        globalFeed.appendChild(articleComponent);
    }

    popularTags() {
        const tagList = document.getElementById('tagList');
        const feedOptions = document.getElementById('feedOptions');
        const navItems = feedOptions.querySelectorAll('li');

        fetch('https://conduit.productionready.io/api/tags').then(function (response) {
            return response.json();
        }).then(r => {
            while (tagList.firstChild) {
                tagList.removeChild(tagList.firstChild);
            }
            r.tags.forEach(tag => {
                const tagEl = this.createNewTagElement(tag);
                tagEl.addEventListener('click', () => {
                    this.removeCurrentTagFilter();

                    navItems.forEach(navItem => {
                        const navLink = navItem.querySelector('a');
                        navLink.className = 'nav-link';
                    });

                    const newNavItem = this.creanteNewNavItem(tag);

                    feedOptions.appendChild(newNavItem);
                    this.cleanGlobalFeed();

                    fetch('https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=' + tag).then(function (response) {
                        return response.json();
                    }).then(r => {
                        r.articles.forEach(article => {
                            this.generateArticle(article, globalFeed);
                        });
                    });
                });
                tagList.appendChild(tagEl);
            });
        });
    }

    cleanGlobalFeed() {
        const globalFeed = document.getElementById('globalFeed');
        while (globalFeed.firstChild) {
            globalFeed.removeChild(globalFeed.firstChild);
        }
        return globalFeed;
    }

    removeCurrentTagFilter() {
        const getCurrentTagFilter = document.getElementById('tagFilter');
        if (getCurrentTagFilter) {
            getCurrentTagFilter.parentNode.removeChild(getCurrentTagFilter);
        }
    }

    creanteNewNavItem(tag) {
        const newNavItem = document.createElement('li');
        newNavItem.className = 'nav-item';
        const newNavLink = document.createElement('a');
        newNavLink.className = 'nav-link active';
        newNavLink.innerHTML = '# ' + tag;
        newNavItem.appendChild(newNavLink);
        newNavItem.id = 'tagFilter';
        return newNavItem;
    }

    createNewTagElement(tag) {
        const tagEl = document.createElement('a');
        tagEl.className = 'tag-pill tag-default';
        tagEl.innerHTML = tag;
        tagEl.href='#/';
        tagEl.style="cursor: pointer;";
        return tagEl;
    }

}

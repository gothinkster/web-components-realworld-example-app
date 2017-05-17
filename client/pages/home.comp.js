import {X_Component} from "../components/component.dec";
import {ArticleComponent} from "../components/article.comp";
"use strict";

@X_Component({
    templateUrl: 'client/pages/home.comp.html'
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
        HomeComponent.template({}).then(el => {
            this.appendChild(el());

            const globalFeed = document.getElementById('globalFeed');

            fetch('https://conduit.productionready.io/api/articles').then(function (response) {
                return response.json();
            }).then(r => {
                r.articles.forEach(article => {
                    this.generateArticle(article, globalFeed);
                });
            });

            this.popularTags();
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
            r.tags.forEach(tag => {
                const tagEl = this.createNewTagElement(tag);
                tagEl.addEventListener('click', () => {

                    const getCurrentTagFilter = document.getElementById('tagFilter');
                    if(getCurrentTagFilter) {
                        getCurrentTagFilter.parentNode.removeChild(getCurrentTagFilter);
                    }

                    navItems.forEach(navItem => {
                        const navLink = navItem.querySelector('a');
                        navLink.className = 'nav-link';
                    });

                    const newNavItem = this.creanteNewNavItem(tag);

                    feedOptions.appendChild(newNavItem);

                    const globalFeed = document.getElementById('globalFeed');
                    while (globalFeed.firstChild) {
                        globalFeed.removeChild(globalFeed.firstChild);
                    }

                    fetch('https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=' + tag).then(function (response) {
                        return response.json();
                    }).then(r => {
                        r.articles.forEach(article => {
                            this.generateArticle(article, globalFeed);
                        });
                    });
                    // https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=testing

                });
                tagList.appendChild(tagEl);
            });
        });
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
        tagEl.style="cursor: pointer;";
        return tagEl;
    }

}

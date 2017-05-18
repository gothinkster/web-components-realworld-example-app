import {ArticleComponent} from "../components/article.comp";
import {Authentication} from "../auth/authentication";
import {RouterHandler} from "../router/router-handler";
"use strict";


export class HomeComponent extends HTMLElement {
    constructor() {
        super();
        this.auth = null;
        if (Authentication.instance.auth) {
            this.auth = Authentication.instance.auth;
        }

        this.$yourFeed = null;
        this.yourFeedHandleEvent = this.yourFeedHandleEvent.bind(this);
        this.globalFeedEventHandle = this.globalFeedEventHandle.bind(this);
        RouterHandler.getInstance.router.navigate('#/');
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        this.innerHTML = this.render();
        this.$yourFeedButton = this.querySelector('#your-feed');
        this.$globalFeedButton = this.querySelector('#globalFeedButton');

        this.$globalFeed = this.querySelector('#globalFeed');

        if (!this.auth) {
            this.$yourFeedButton.parentNode.removeChild(this.$yourFeedButton);
            this.$globalFeedButton.classList.add('active');
            this.fetchArticles('');
            console.log('NOT AUTHORIZED');
        } else {
            this.$yourFeedButton.addEventListener('click', this.yourFeedHandleEvent);
            this.fetchArticles('/feed', {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.auth.token
            });
            console.log('AUTHORIZED');
        }

        this.$globalFeedButton.addEventListener('click', this.globalFeedEventHandle);

        let popularTags = this.querySelector('popular-tags');
        popularTags.addEventListener('filter', (e) => {
            this.onTagFilter(e.detail);
        });
    }

    globalFeedEventHandle(e) {
        e.preventDefault();
        this.removeCurrentTagFilter();
        this.$globalFeedButton.classList.add('active');
        this.$yourFeedButton.classList.remove('active');
        this.fetchArticles('');
    }

    yourFeedHandleEvent(e) {
        e.preventDefault();
        this.removeCurrentTagFilter();
        this.$yourFeedButton.classList.add('active');
        this.$globalFeedButton.classList.remove('active');
        this.fetchArticles('/feed', {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.auth.token
        });
    }

    generateArticle(article) {
        if (!article.author.image) {
            article.author.image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
        }
        let articleComponent = new ArticleComponent();
        articleComponent.model = article;
        this.$globalFeed.appendChild(articleComponent);
    }


    onTagFilter(tag) {
        let feedOptions = this.querySelector('#feedOptions');

        //clear any current state
        this.removeCurrentTagFilter();
        this.cleanGlobalFeed();
        this.$yourFeedButton.classList.remove('active');
        this.$globalFeedButton.classList.remove('active');
        //generate new item
        const newNavItem = this.creanteNewNavItem(tag);
        feedOptions.appendChild(newNavItem);
        this.fetchArticles('?limit=10&offset=0&tag=' + tag);
    }

    cleanGlobalFeed() {
        while (this.$globalFeed.firstChild) {
            this.$globalFeed.removeChild(this.$globalFeed.firstChild);
        }
        return this.$globalFeed;
    }

    removeCurrentTagFilter() {
        const getCurrentTagFilter = this.querySelector('#tagFilter');
        if (getCurrentTagFilter) {
            getCurrentTagFilter.parentNode.removeChild(getCurrentTagFilter);
        }
    }



    fetchArticles(params, headers) {
        this.cleanGlobalFeed();
        this.$globalFeed.innerHTML = '<div class="article-preview">Loading articles </div>';
        fetch('https://conduit.productionready.io/api/articles' + params, {
            headers: headers
        }).then(function (response) {
            return response.json();
        }).then(r => {
            this.$globalFeed.textContent = '';
            r.articles.forEach(article => {
                this.generateArticle(article);
            });
            if(r.articles.length === 0) {
                this.$globalFeed.innerHTML = '<div class="article-preview">No articles are here... yet. </div>';
            }
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


    render() {
        return `
        <div>
            <c-banner></c-banner>
            <div class="container page">
                <div class="row">
                    <div class="col-md-9">
                        <div class="feed-toggle">
                            <ul id="feedOptions" class="nav nav-pills outline-active">
                                <li class="nav-item">
                                    <a id="your-feed" class="nav-link active" href="">Your Feed</a>
                                </li>
                                <li class="nav-item">
                                    <a id="globalFeedButton" href="#" class="nav-link">Global Feed</a>
                                </li>
                            </ul>
                        </div>
                        <div id="globalFeed">
                            <span>Loading articles ...</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <popular-tags></popular-tags>
                    </div>
                </div>
            </div>
        </div>
`;
    }

}

import {ArticleComponent} from "../components/article.comp.js";
import {Authentication} from "../auth/authentication.js";
import {RouterHandler} from "../router/router-handler.js";
import {Http} from "../http/http.js";

export class HomeComponent extends HTMLElement {
    constructor() {
        super();
        this.auth = null;
        if (Authentication.instance.auth) {
            this.auth = Authentication.instance.auth;
        }

        this.yourFeedHandleEvent = this.yourFeedHandleEvent.bind(this);
        this.globalFeedEventHandle = this.globalFeedEventHandle.bind(this);
        this.onPagination = this.onPagination.bind(this);
        RouterHandler.getInstance.router.navigate('#/');
        this._offset = 0;
        this._limit = 10;
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
            this.fetchArticles('?limit=10&offset=' + this._offset);
        } else {
            this.$yourFeedButton.addEventListener('click', this.yourFeedHandleEvent);
            this.fetchArticles('/feed?limit=10&offset=' + this._offset, true);
        }

        this.$globalFeedButton.addEventListener('click', this.globalFeedEventHandle);

        let popularTags = this.querySelector('popular-tags');
        popularTags.addEventListener('filter', (e) => {
            this.onTagFilter(e.detail);
        });
    }

    createNavigation(articleCount) {
        const ulPagination = this.querySelector('ul.pagination');
        while (ulPagination.firstChild) {
            ulPagination.firstChild.removeEventListener('click', this.onPagination);
            ulPagination.removeChild(ulPagination.firstChild);
        }
        for (let i = 1; i <= articleCount / this._limit; i++) {
            let temp = `<li class="page-item">
                            <a class="page-link" href="">${i}</a>
                        </li>`
            let temp2 = document.createElement('div');
            temp2.innerHTML = temp;
            ulPagination.appendChild(temp2.firstChild);
        }
        const pagination = this.querySelectorAll('li.page-item');
        pagination.forEach(p => {
            p.addEventListener('click', (e) => this.onPagination(e, p));
        });
    }

    cleanPagination() {
        const pagination = this.querySelectorAll('li.page-item');
        pagination.forEach(p => {
            p.removeEventListener('click', (e) => this.onPagination);
        });
    }

    onPagination(e, p) {
        e.preventDefault();
        let activePage = this.querySelector('li.page-item.active');
        if(activePage) {
            activePage.classList.remove('active');
        }
        p.classList.add('active');
        this._offset = +p.textContent.trim() - 1;
        let currentActive = this.querySelector('#feedOptions li.nav-item a.active');
        if (currentActive.getAttribute('id') == 'your-feed') {
            this.fetchNextArticle('/feed?limit=10&offset=' + this._offset * this._limit, true);
        } else if (currentActive.getAttribute('id') == 'globalFeedButton') {
            this.fetchNextArticle('?limit=10&offset=' + this._offset * this._limit);
        } else {
            let tagFilter = this.querySelector('#tagFilter').textContent.trim().substring(2);
            this.fetchNextArticle('?limit=10&offset=' + this._offset * this._limit + '&tag=' + tagFilter);
        }
    }


    globalFeedEventHandle(e) {
        e.preventDefault();
        this.removeCurrentTagFilter();
        this.$globalFeedButton.classList.add('active');
        this.$yourFeedButton.classList.remove('active');
        this.fetchArticles('?limit=10&offset=' + this._offset);
    }

    yourFeedHandleEvent(e) {
        e.preventDefault();
        this.removeCurrentTagFilter();
        this.$yourFeedButton.classList.add('active');
        this.$globalFeedButton.classList.remove('active');
        this.fetchArticles('/feed?limit=10&offset=' + this._offset, true);
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
        this.fetchArticles('?limit=10&offset=' + this._offset + '&tag=' + tag);
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


    fetchArticles(params, auth) {
        this.cleanGlobalFeed();
        this.$globalFeed.innerHTML = '<div class="article-preview">Loading articles </div>';

        Http.instance.doGet('/articles' + params, auth).then(function (response) {
            return response.json();
        }).then(r => {
            const articlesCount = r.articlesCount;
            this.$globalFeed.textContent = '';
            r.articles.forEach(article => {
                this.generateArticle(article);
            });
            if (r.articles.length === 0) {
                this.$globalFeed.innerHTML = '<div class="article-preview">No articles are here... yet. </div>';
            }

            this.createNavigation(articlesCount);
        });
    }


    fetchNextArticle(params, auth) {
        this.cleanGlobalFeed();
        this.$globalFeed.innerHTML = '<div class="article-preview">Loading articles </div>';

        Http.instance.doGet('/articles' + params, auth).then(function (response) {
            return response.json();
        }).then(r => {
            this.$globalFeed.textContent = '';
            r.articles.forEach(article => {
                this.generateArticle(article);
            });
            if (r.articles.length === 0) {
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
                <nav>
                    <ul class="pagination">
                        <li class="page-item active">
                            <a class="page-link" href="">1</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="">2</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
`;
    }

}

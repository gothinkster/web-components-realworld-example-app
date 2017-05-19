import {ArticleComponent} from "../components/article.comp";
import {Http} from "../http/http";
import {Authentication} from "../auth/authentication";
"use strict";


export class ProfileComponent extends HTMLElement {
    constructor(params) {
        super();
        this.username = params.username;

        this.myArticlesButtonHandler = this.myArticlesButtonHandler.bind(this);
        this.favoritedArticlesButtonHandler = this.favoritedArticlesButtonHandler.bind(this);
        this.auth = Authentication.instance.auth;
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        const el = this.render();
        this.innerHTML = el;

        this.$globalFeed = this.querySelector('#globalFeed');
        this.$myArticlesButton = this.querySelector('#my-articles');
        this.$favoritedArticlesButton = this.querySelector('#favorited-articles');

        this.$myArticlesButton.addEventListener('click', this.myArticlesButtonHandler);
        this.$favoritedArticlesButton.addEventListener('click', this.favoritedArticlesButtonHandler);

        this.fetchArticles('?author=' + this.username);
    }

    myArticlesButtonHandler(e) {
        e.preventDefault();
        this.fetchArticles('?author=' + this.username);
        this.$favoritedArticlesButton.classList.remove('active');
        this.$myArticlesButton.classList.add('active');
    }

    favoritedArticlesButtonHandler(e) {
        e.preventDefault();
        this.fetchArticles('?favorited=' + this.username);
        this.$favoritedArticlesButton.classList.add('active');
        this.$myArticlesButton.classList.remove('active');
    }

    fetchArticles(params) {
        this.cleanGlobalFeed();
        this.$globalFeed.innerHTML = '<div class="article-preview">Loading articles </div>';
        Http.instance.doGet('articles' + params, true).then(function (response) {
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

    cleanGlobalFeed() {
        while (this.$globalFeed.firstChild) {
            this.$globalFeed.removeChild(this.$globalFeed.firstChild);
        }
        return this.$globalFeed;
    }

    generateArticle(article) {
        if (!article.author.image) {
            article.author.image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
        }
        let articleComponent = new ArticleComponent();
        articleComponent.model = article;
        this.$globalFeed.appendChild(articleComponent);
    }


    render() {
        return `
               <div class="profile-page">
                  <user-info username="${this.username}"></user-info>
                 
                
                  <div class="container">
                    <div class="row">
                
                      <div class="col-xs-12 col-md-10 offset-md-1">
                        <div class="articles-toggle">
                          <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                              <a id="my-articles" class="nav-link active" href="">My Articles</a>
                            </li>
                            <li class="nav-item">
                              <a id="favorited-articles" class="nav-link" href="">Favorited Articles</a>
                            </li>
                          </ul>
                        </div>
                
                        <div id="globalFeed">
                            <div class="article-preview">
                             Loading articles
                            </div>
                        </div>
                
                      </div>
                
                    </div>
                  </div>
                
                </div>

        `;
    }


}

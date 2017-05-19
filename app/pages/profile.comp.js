import {ArticleComponent} from "../components/article.comp";
"use strict";


export class ProfileComponent extends HTMLElement {
    constructor(params) {
        super();
        this.username = params.username;
        this.model = null;

        this.$username = null;
        this.$bio = null;
        this.userImg = null;
        this.followButton = null;
        this.followButtonUsername = null;

        this.myArticlesButtonHandler = this.myArticlesButtonHandler.bind(this);
        this.favoritedArticlesButtonHandler = this.favoritedArticlesButtonHandler.bind(this);
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        const el = this.render();
        this.innerHTML = el;

        this.$username = document.getElementById('username');
        this.$bio = document.getElementById('bio');
        this.userImg = document.getElementById('user-img');
        this.followButton = document.getElementById('follow-button');
        this.followButtonUsername = document.getElementById('follow-button-username');

        fetch('https://conduit.productionready.io/api/profiles/' + this.username).then((response) => {
            return response.json();
        }).then(r => {
            this.model = r.profile;
            this.updateUserProfileDom();
        });

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


    updateUserProfileDom() {
        this.$username.textContent = this.model.username;
        this.followButtonUsername.textContent = this.model.username;
        this.$bio.textContent = this.model.bio;
        this.userImg.setAttribute('src', this.model.image);
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
                  <div class="user-info">
                    <div class="container">
                      <div class="row">
                
                        <div class="col-xs-12 col-md-10 offset-md-1">
                          <img id="user-img" src="https://static.productionready.io/images/smiley-cyrus.jpg" class="user-img" />
                          <h4 id="username"></h4>
                          <p id="bio">
                            
                          </p>
                          <button id="follow-button" class="btn btn-sm btn-outline-secondary action-btn">
                            <i class="ion-plus-round"></i>
                            &nbsp;
                            Follow <span id="follow-button-username"></span>
                          </button>
                        </div>
                
                      </div>
                    </div>
                  </div>
                
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

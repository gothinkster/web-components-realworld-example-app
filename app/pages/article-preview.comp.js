import {CommentPreviewComponent} from "../components/comment-preview.comp";
"use strict";
var markdown = require("markdown").markdown;


export class ArticlePreviewComponent extends HTMLElement {
    constructor(params) {
        super();
        this.slug = params.slug;
        this.article = null;

        this.$articleTitle = null;
        this.$profileUsername = null;
        this.$articleDate = null;
        this.$articleBody = null;
        this.$articleActionUsername = null;
        this.$articleActionDate = null;
        this.$articleActionFollowUsername = null;
        this.$articleActionFavouritesCount = null;

        this.$commentsWrapper = null;
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        const el = this.render();
        this.innerHTML = el;

        this.$articleTitle = document.getElementById('article-title');
        this.$profileUsername = document.getElementById('profile-username');
        this.$articleDate = document.getElementById('article-date');
        this.$articleBody = document.getElementById('article-body');
        this.$articleActionUsername = document.getElementById('article-action-username');
        this.$articleActionDate = document.getElementById('article-action-date');
        this.$articleActionFollowUsername = document.getElementById('article-action-follow-username');
        this.$articleActionFavouritesCount = document.getElementById('article-action-favorites-count');

        // /api/articles/:slug
        fetch('https://conduit.productionready.io/api/articles/' + this.slug).then((response) => {
            return response.json();
        }).then(r => {
            this.article = r.article;
            this.updateArticleContent();
        });
    }

    updateArticleContent() {
        this.$articleTitle.textContent = this.article.title;
        this.$profileUsername.textContent = this.article.author.username;
        this.$articleDate.textContent = this.article.createdAt;
        this.$articleBody.innerHTML = markdown.toHTML(this.article.body);
        this.$articleActionUsername.textContent = this.article.author.username;
        this.$articleActionDate.textContent = this.article.createdAt;
        this.$articleActionFollowUsername.textContent = this.article.author.username;
        this.$articleActionFavouritesCount.textContent = '(' + this.article.favoritesCount + ')';
    }


    render() {
        return `
              <div class="article-page">
                  <div class="banner">
                    <div class="container">
                
                      <h1 id="article-title"></h1>
                
                      <div class="article-meta">
                        <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                        <div class="info">
                          <a id="profile-username" href="" class="author"></a>
                          <span id="article-date" class="date"></span>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary">
                          <i class="ion-plus-round"></i>
                          &nbsp;
                          Follow Eric Simons <span class="counter">(10)</span>
                        </button>
                        &nbsp;&nbsp;
                        <button class="btn btn-sm btn-outline-secondary">
                          <i class="ion-heart"></i>
                          &nbsp;
                          Favorite Post <span class="counter">(29)</span>
                        </button>
                      </div>
                
                    </div>
                  </div>
                
                  <div class="container page">
                
                    <div class="row article-content">
                      <div id="article-body" class="col-md-12">
                        
                      </div>
                    </div>
                
                    <hr />
                
                    <div class="article-actions">
                      <div class="article-meta">
                        <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                        <div class="info">
                          <a id="article-action-username" href="" class="author"></a>
                          <span id="article-action-date" class="date"></span>
                        </div>
                
                        <button class="btn btn-sm btn-outline-secondary">
                          <i class="ion-plus-round"></i>
                          &nbsp;
                          Follow <span id="article-action-follow-username"></span> <!--<span class="counter">(10)</span>-->
                        </button>
                        &nbsp;
                        <button class="btn btn-sm btn-outline-primary">
                          <i class="ion-heart"></i>
                          &nbsp;
                          Favorite Post <span id="article-action-favorites-count" class="counter"></span>
                        </button>
                      </div>
                    </div>
                    
                    
                
                    <div class="row">
                
                      <div class="col-xs-12 col-md-8 offset-md-2">
                
                        <form class="card comment-form">
                          <div class="card-block">
                            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                          </div>
                          <div class="card-footer">
                            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                            <button class="btn btn-sm btn-primary">
                             Post Comment
                            </button>
                          </div>
                        </form>
                        <comments-container slug="${this.slug}"></comments-container>
                      </div>
                
                    </div>
                
                  </div>
                
                </div>
        `;
    }


}

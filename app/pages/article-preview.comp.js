import {Http} from "../http/http";
"use strict";
var markdown = require("markdown").markdown;


export class ArticlePreviewComponent extends HTMLElement {
    constructor(params) {
        super();
        this.slug = params.slug;
        this.article = null;

        this.$articleBody = null;
        this.onCommentPost = this.onCommentPost.bind(this);
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        this.innerHTML = this.render();

        this.$articleBody = document.getElementById('article-body');
        this.$commentCreate = this.querySelector('comment-create');
        this.$commentsContainer = this.querySelector('comments-container');
        this.$commentCreate.addEventListener('comment', this.onCommentPost);

        Http.instance.doGet('/articles/' + this.slug).then((response) => {
            return response.json();
        }).then(r => {
            this.article = r.article;
            this.updateArticlePreviewBanner();
            this.updateArticleContent();
        });
    }

    disconnectedCallback() {
        this.$commentCreate.removeEventListener('comment', this.onCommentPost);
    }

    onCommentPost(e) {
        this.$commentsContainer.comments.unshift({
            author: {
                username: 'admir'
            },
            body: e.detail
        });
        this.$commentsContainer.refresh();
    }

    updateArticlePreviewBanner() {
        const articlePreviewBanner = this.querySelector('article-preview-banner');
        articlePreviewBanner.setAttribute('title', this.article.title);
        articlePreviewBanner.setAttribute('username', this.article.author.username);
        articlePreviewBanner.setAttribute('favorites-count', this.article.favoritesCount);
        articlePreviewBanner.setAttribute('date', this.article.createdAt);
        articlePreviewBanner.setAttribute('image', this.article.author.image);
    }

    updateArticleContent() {
        this.$articleBody.innerHTML = markdown.toHTML(this.article.body);
    }


    render() {
        return `
              <div class="article-page">
                <article-preview-banner title="Loading .." username=".." date=".." image="https://static.productionready.io/images/smiley-cyrus.jpg" favorites-count="Loading ..." ></article-preview-banner>
                
                  <div class="container page">
                
                    <div class="row article-content">
                      <div id="article-body" class="col-md-12">
                        Loading ...
                      </div>
                    </div>
                
                    <hr />
                
                    <div class="row">
                
                      <div class="col-xs-12 col-md-8 offset-md-2">
                        <comment-create></comment-create>
                        <comments-container slug="${this.slug}"></comments-container>
                      </div>
                
                    </div>
                
                  </div>
                
                </div>
        `;
    }


}

import {Http} from "../http/http";
var markdown = require("markdown").markdown;

class ArticlePreviewComponent extends HTMLElement {
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
        this.$articlePreviewBanner = this.querySelector('article-preview-banner');

        Http.instance.doGet('/articles/' + this.slug, true).then((response) => {
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
        if (e.detail && e.detail.length > 0) {
            const comment = {
                "comment": {
                    "body": e.detail
                }
            };
            Http.instance.doPost('/articles/' + this.slug + '/comments', JSON.stringify(comment), true).then(response => {
                this.$commentsContainer.comments.unshift(response.comment);
                this.$commentsContainer.refresh();
            });
        }
    }

    updateArticlePreviewBanner() {
        this.$articlePreviewBanner._slug = this.article.slug;
        this.$articlePreviewBanner.setAttribute('title', this.article.title);
        this.$articlePreviewBanner.setAttribute('username', this.article.author.username);
        this.$articlePreviewBanner.setAttribute('favorites-count', this.article.favoritesCount);
        this.$articlePreviewBanner.setAttribute('date', this.article.createdAt);
        this.$articlePreviewBanner.setAttribute('image', this.article.author.image);
        this.$articlePreviewBanner.setAttribute('following', this.article.author.following);
        this.$articlePreviewBanner.setAttribute('favorited', this.article.favorited);
    }

    updateArticleContent() {
        this.$articleBody.innerHTML = markdown.toHTML(this.article.body);
    }


    render() {
        return `
              <div class="article-page">
                <article-preview-banner following="" title="Loading .." username=".." date=".." image="https://static.productionready.io/images/smiley-cyrus.jpg" favorites-count="Loading ..." ></article-preview-banner>
                
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

window.customElements.define('article-preview', ArticlePreviewComponent);
export default ArticlePreviewComponent;

import {Authentication} from "../auth/authentication";
export class CommentCreateComponent extends HTMLElement {
    constructor() {
        super();
        this.postComment = this.postComment.bind(this);
        this.auth = Authentication.instance.auth;
        this.image = "https://static.productionready.io/images/smiley-cyrus.jpg";
        if (this.auth) {
            this.image = this.auth.image;
        }
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    connectedCallback() {
        if (this.auth) {
            this.innerHTML = this.renderCommentForm();
            this.$postCommentBtn = this.querySelector('#postCommentBtn');
            this.$commentValue = this.querySelector('#comment-value');
            this.$postCommentBtn.addEventListener('click', this.postComment)
        } else {
            this.innerHTML = this.renderLoginButtons();
        }
    }

    postComment(e) {
        e.preventDefault();
        var event = new CustomEvent('comment', {'detail': this.$commentValue.value});
        this.dispatchEvent(event);
    }

    disconnectedCallback() {
        if (this.auth) {
            this.$postCommentBtn.removeEventListener('click', this.postComment)
        }
    }

    renderCommentForm() {
        return `
        <form class="card comment-form">
          <div class="card-block">
            <textarea id="comment-value" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img src="${this.image ? this.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}" class="comment-author-img" />
            <button id="postCommentBtn" class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>
`;
    }

    renderLoginButtons() {
        return `
<div class="col-xs-12 col-md-8 offset-md-2">
<p>
<a class="" href="#/login">Sign in</a>
 or 
<a class="" href="#/register">sign up</a>
 to add comments on this article.
</p>
<div>

</div>
</div>`;
    }

}
import {RouterHandler} from "../router/router-handler";
"use strict";

export class CommentPreviewComponent extends HTMLElement {

    constructor() {
        super();
        this._username = null;
        this._content = null;
        this.authorImage = null;
        this.createdAt = null;

        this.$authorUsername = null;
        this.$authorImage = null;
        this.$createdAt = null;
        this.$content = null;

        this.navigateToUser = this.navigateToUser.bind(this);
    }

    static get observedAttributes() {
        return ['username', 'content']; //, 'authorImage', 'createdAt', 'content'
    }

    attributeChangedCallback(name, oldValue, newValue) {

        switch (name) {
            case 'username' : {
                this._username = newValue;
            }
            case 'content': {
                this._content = newValue;
            }
        }

        this.updateScreen();
    }

    disconnectedCallback() {
        this.$authorUsername.removeEventListener('click', this.navigateToUser);
    }

    connectedCallback() {
        this.innerHTML = this.render();
        this.$authorUsername = this.querySelector('#author-username');
        this.$authorImage = this.querySelector('#author-image');
        this.$createdAt = this.querySelector('#createdAt');
        this.$content = this.querySelector('#comment-content');
        this.updateScreen();


        this.$authorUsername.addEventListener('click', this.navigateToUser);
    }

    set username(value) {
        this.setAttribute('username', value);
    }

    get username() {
        return this._username;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this.setAttribute('content', value)
    }


    updateScreen() {
        if (this.$authorUsername) {//dom is rendered
            this.$authorUsername.textContent = this._username;
            this.$authorImage.textContent = this.authorImage;
            this.$createdAt.textContent = this.createdAt;
            this.$content.textContent = this.content;
        }
    }

    navigateToUser(e) {
        e.preventDefault();
        RouterHandler.getInstance.router.navigate(this.$authorUsername.getAttribute('href'));
    }


    render() {
        return `
        <div class="card">
          <div class="card-block">
            <p id="comment-content" class="card-text"></p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img id="author-image" src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            </a>
            &nbsp;
            <a id="author-username" href="#/profile/${this.username}" class="comment-author"></a>
            <span id="createdAt" class="date-posted">Dec 29th</span>
          </div>
        </div>
        `;
    }

}

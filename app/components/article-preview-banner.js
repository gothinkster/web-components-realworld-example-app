import {Authentication} from "../auth/authentication";
import {Http} from "../http/http";
import {formatDate} from "../date-util";
export class ArticlePreviewBannerComponent extends HTMLElement {

    constructor() {
        super();
        this.auth = Authentication.instance.auth;
        this.followButtonAction = this.followButtonAction.bind(this);
        this.favoriteButtonAction = this.favoriteButtonAction.bind(this);
        this._title = null;
        this._username = null;
        this._favoritesCount = null;
        this._date = null;
        this._image = null;
        this._following = null;
        this._favorited = null;

        this._slug = null;
    }

    static get observedAttributes() {
        return ['title', 'username', 'favorites-count', 'date', 'image', 'following', 'favorited'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue) {
            switch (name) {
                case 'title': {
                    this._title = newValue;
                    this.innerHTML = this.render();
                    break;
                }
                case 'username': {
                    this._username = newValue;
                    this.innerHTML = this.render();
                    break;
                }
                case 'favorites-count' : {
                    this._favoritesCount = newValue;
                    this.innerHTML = this.render();
                    break;
                }
                case 'date' : {
                    this._date = newValue;
                    this.innerHTML = this.render();
                    break;
                }
                case 'image': {
                    this._image = newValue;
                    this.innerHTML = this.render();
                    break;
                }
                case 'following': {
                    this._following = newValue == 'true';
                    if (this.$followButton) {
                        this.$followButton.innerHTML = this.renderFollowButton();
                    }
                    break;
                }
                case 'favorited': {
                    this._favorited = newValue == 'true';
                    console.log(newValue);
                    if (this.$favoriteButton) {
                        this.$favoriteButton.innerHTML = this.renderFavoriteButton();
                    }
                    break;
                }
            }

            this.$followButton = this.querySelector('#follow-button');
            this.$favoriteButton = this.querySelector('#favorite-button');
            if (this.$followButton) {
                this.$followButton.addEventListener('click', this.followButtonAction);
            }

            if (this.$favoriteButton) {
                this.$favoriteButton.addEventListener('click', this.favoriteButtonAction);
            }
        }
    }

    connectedCallback() {
        this.innerHTML = this.render();
    }


    followButtonAction(e) {
        if (this.following === true) {
            Http.instance.doDelete('profiles/' + this.username + '/follow', true).then(r => {
                this._following = r.profile.following;
                this.$followButton.innerHTML = this.renderFollowButton();
            });
        } else {
            Http.instance.doPost('profiles/' + this.username + '/follow', JSON.stringify({}), true).then(r => {
                this._following = r.profile.following;
                this.$followButton.innerHTML = this.renderFollowButton();
            });
        }
    }

    favoriteButtonAction() {
        let path = '/articles/' + this._slug + '/favorite';
        if (this._favorited) {
            Http.instance.doDelete(path, true).then(r => {
                this._favorited = r.article.favorited;
                this._favoritesCount = r.article.favoritesCount;
                this.$favoriteButton.innerHTML = this.renderFavoriteButton();
            });
        } else {
            Http.instance.doPost(path, JSON.stringify({}), true).then(r => {
                this._favorited = r.article.favorited;
                this._favoritesCount = r.article.favoritesCount;
                this.$favoriteButton.innerHTML = this.renderFavoriteButton();
            });
        }
    }

    renderFollowButton() {
        return `<i class="ion-plus-round"></i>
                        ${this.following == true ? 'Unfollow' : 'Follow'} ${this.username}`;
    }

    renderFavoriteButton() {
        return `
            ${this._favorited == true ? 'Unfavorite' : 'Favorite'} Post <span class="counter">(${this.favoritesCount})</span>
        `;
    }

    disconnectedCallback() {
        if (this.$followButton) {
            this.$followButton.removeEventListener('click', this.followButtonAction);
        }
        if (this.$favoriteButton) {
            this.$favoriteButton.removeEventListener('click', this.favoriteButtonAction);
        }
    }


    render() {
        return `
                  <div class="banner">
                    <div class="container">
                
                      <h1 id="article-title">
                        ${this.title}
                      </h1>
                
                      <div class="article-meta">
                        <a href="#/profile/${this._username}">
                            <img src="${this.image}" alt="no img" />
                        </a>
                        <div class="info">
                          <a id="profile-username" href="#/profile/${this._username}" class="author">${this._username}</a>
                          <span id="article-date" class="date">${formatDate(this.date)}</span>
                        </div>
${
            this.auth && this.auth.username === this.username ?
                `
                <span>
                <a class="btn btn-outline-secondary btn-sm" href="#/editor/${this._slug}">
                    <i class="ion-edit"></i>Edit Article
                </a>
                <button class="btn btn-outline-danger btn-sm"><i class="ion-trash-a">
                    </i>TODO Delete Article</button>
                </span>` : `
                <button id="follow-button" class="btn btn-sm btn-outline-secondary">
                 ${this.renderFollowButton()}
                </button>
               
                <button id="favorite-button" class="btn btn-sm btn-outline-secondary">
                  <i class="ion-heart"></i>
                    ${this.renderFavoriteButton()}
                </button>`
            }

                      </div>
                
                    </div>
                  </div>
`;
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    get title() {
        return this._title;
    }

    set username(value) {
        this.setAttribute('username', value);
    }

    get username() {
        return this._username;
    }

    set favoritesCount(value) {
        this.setAttribute('favorites-count', value);
    }

    get favoritesCount() {
        return this._favoritesCount;
    }

    set date(value) {
        this.setAttribute('date', value);
    }

    get date() {
        return this._date;
    }

    set image(value) {
        this.setAttribute('image', value);
    }

    get image() {
        return this._image;
    }

    set following(value) {
        this.setAttribute('following', value);
    }

    get following() {
        return this._following;
    }
}

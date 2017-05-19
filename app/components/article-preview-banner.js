import {Authentication} from "../auth/authentication";
export class ArticlePreviewBannerComponent extends HTMLElement {

    constructor() {
        super();
        this.auth = Authentication.instance.auth;
        this.followButtonAction = this.followButtonAction.bind(this);
        this._title = null;
        this._username = null;
        this._favoritesCount = null;
        this._date = null;
        this._image = null;
    }

    static get observedAttributes() {
        return ['title', 'username', 'favorites-count', 'date', 'image'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue) {
            switch (name) {
                case 'title': {
                    this._title = newValue;
                    break;
                }
                case 'username': {
                    this._username = newValue;
                    break;
                }
                case 'favorites-count' : {
                    this._favoritesCount = newValue;
                    break;
                }
                case 'date' : {
                    this._date = newValue;
                    break;
                }
                case 'image': {
                    this._image = newValue;
                    break;
                }
            }
            this.innerHTML = this.render();
        }
    }

    connectedCallback() {
        this.innerHTML = this.render();
    }

    followButtonAction(e) {

    }

    disconnectedCallback() {
        if (this.$followButton) {
            this.$followButton.removeEventListener('click', this.followButtonAction);
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
                        <a href="">
                            <img src="${this.image}" alt="no img" />
                        </a>
                        <div class="info">
                          <a id="profile-username" href="" class="author">${this._username}</a>
                          <span id="article-date" class="date">${this.date}</span>
                        </div>
${
            this.auth && this.auth.username === this.username ?
                `
                <span>
                <a class="btn btn-outline-secondary btn-sm" href="#/editor/asdasd-d1z1f3">
                    <i class="ion-edit"></i>TODO Edit Article
                </a>
                <button class="btn btn-outline-danger btn-sm"><i class="ion-trash-a">
                    </i>TODO Delete Article</button>
                </span>` : `
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp;
                 TODO Follow ${this._username}
                </button>
                &nbsp;&nbsp;
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="ion-heart"></i>
                  &nbsp;
                 TODO Favorite Post <span class="counter">${this.favoritesCount}</span>
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
}

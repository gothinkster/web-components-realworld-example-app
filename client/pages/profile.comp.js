import {ArticleComponent} from "../components/article.comp";
"use strict";


export class ProfileComponent extends HTMLElement {
    constructor(params) {
        super();
        this.username = params.username;
        this.model = null;

        console.log(params);
        this.$username = null;
        this.$bio = null;
        this.userImg = null;
        this.followButton = null;
        this.followButtonUsername = null;
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
            console.log(this.model);
            this.updateUserProfileDom();
        });
    }


    updateUserProfileDom() {
        this.$username.textContent = this.model.username;
        this.followButtonUsername.textContent = this.model.username;
        this.$bio.textContent = this.model.bio;
        this.userImg.setAttribute('src', this.model.image);
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
                              <a class="nav-link active" href="">My Articles</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="">Favorited Articles</a>
                            </li>
                          </ul>
                        </div>
                
                        <div class="article-preview">
                          <div class="article-meta">
                            <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                            <div class="info">
                              <a href="" class="author">Eric Simons</a>
                              <span class="date">January 20th</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right">
                              <i class="ion-heart"></i> 29
                            </button>
                          </div>
                          <a href="" class="preview-link">
                            <h1>How to build webapps that scale</h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                          </a>
                        </div>
                
                      </div>
                
                    </div>
                  </div>
                
                </div>

        `;
    }


}

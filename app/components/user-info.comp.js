import {Authentication} from "../auth/authentication";
export class UserInfoComponent extends HTMLElement {

    constructor() {
        super();
        this.auth = Authentication.instance.auth;
        this.followButtonAction = this.followButtonAction.bind(this);
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        this.username = this.getAttribute('username');
        fetch('https://conduit.productionready.io/api/profiles/' + this.username).then((response) => {
            return response.json();
        }).then(r => {
            this.model = r.profile;
            this.innerHTML = this.render();
            this.$followButton = this.querySelector('#follow-button');
            if(this.$followButton) {
                this.$followButton.addEventListener('click', this.followButtonAction);
            }
        });
    }

    followButtonAction(e) {

    }

    disconnectedCallback() {
        if(this.$followButton) {
            this.$followButton.removeEventListener('click', this.followButtonAction);
        }
    }

    // this.$username = document.getElementById('username');
    // this.$bio = document.getElementById('bio');
    // this.userImg = document.getElementById('user-img');

    // this.followButtonUsername = document.getElementById('follow-button-username');

    // updateUserProfileDom() {
    //     this.$username.textContent = this.model.username;
    //     if(this.followButtonUsername) {
    //         this.followButtonUsername.textContent = this.model.username;
    //     }
    //     this.$bio.textContent = this.model.bio;
    //     this.userImg.setAttribute('src', this.model.image);
    // }

    render() {
        return `

<div class="user-info">
    <div class="container">
      <div class="row">
    
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img id="user-img" src="${this.model.image}" class="user-img" />
          <h4 id="username">${this.username}</h4>
          <p id="bio">
            ${this.model.bio ? this.model.bio : ''}
          </p>
          ${!this.auth ?
            `<button id="follow-button" class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow ${this.username}
          </button>` :
            `<a class="btn btn-sm btn-outline-secondary action-btn" href="/#/settings"><i class="ion-gear-a"></i> Edit Profile Settings</a>`
            }
          
          
        </div>
    
      </div>
    </div>
</div>


`;
    }
}

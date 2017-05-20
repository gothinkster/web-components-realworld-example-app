import {Http} from "../http/http";
import {Authentication} from "../auth/authentication";
import {RouterHandler} from "../router/router-handler";
"use strict";
export class CRegisterComponent extends HTMLElement {
    constructor() {
        super();
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // /api/users
    }

    disconnectedCallback() {
        this.$registerButton.removeEventListener('click', this.handleRegistration);
    }

    connectedCallback() {
        this.innerHTML = this.render();
        this.$email = this.querySelector('#email');
        this.$password = this.querySelector('#password');
        this.$username = this.querySelector('#username');
        this.$form = this.querySelector('form');
        this.$errorMessages = this.querySelector('.error-messages');

        this.$registerButton = this.querySelector('#register-button');
        this.$registerButton.addEventListener('click', this.handleRegistration);
    }

    handleRegistration(e) {
        if (this.$form.checkValidity()) {
            e.preventDefault();

            let data = {
                "user": {
                    "username": this.$username.value,
                    "email": this.$email.value,
                    "password": this.$password.value
                }
            };
            Http.instance.doPost('/users', JSON.stringify(data)).then(r => {
                if (r.errors) {
                    for (var prop in r.errors) {
                        if(!r.errors.hasOwnProperty(prop)) continue;
                        while(this.$errorMessages.firstChild) {
                            this.$errorMessages.removeChild(this.$errorMessages.firstChild);
                        }
                        r.errors[prop].forEach(m => {
                            let text = prop + " " + m;
                            let errorItem = document.createElement('li');
                            errorItem.textContent = text;
                            this.$errorMessages.appendChild(errorItem);
                        });
                    }
                } else {
                    Authentication.instance.auth = r.user;
                    Authentication.instance._callbacks.forEach(callback => callback(r.user));
                    RouterHandler.getInstance.router.navigate('/');
                }
            });
        }
    }


    render() {
        return `
 <div class="auth-page">
  <div class="container page">
    <div class="row">
        
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <a href="#/login">Have an account?</a>
        </p>

        <ul class="error-messages">
          <!--<li>That email is already taken</li>-->
        </ul>

        <form>
          <fieldset class="form-group">
            <input id="username" required class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input id="email" required class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input id="password" required class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button id="register-button" class="btn btn-lg btn-primary pull-xs-right">
            Sign up
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
`;
    }


}

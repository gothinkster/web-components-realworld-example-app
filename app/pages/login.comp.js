import {Authentication} from "../auth/authentication.js";
import {RouterHandler} from "../router/router-handler.js";

export class CLoginComponent extends HTMLElement {
    constructor() {
        super();
        this.$signinButton = null;
        this.$email = null;
        this.$password = null;
        this.$errorMessages = null;

        this.$form = null;
        this.doAuthentication = this.doAuthentication.bind(this);
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    disconnectedCallback() {
        this.$signinButton.removeEventListener('click', this.doAuthentication)
    }

    connectedCallback() {
        this.innerHTML = this.render();
        this.$signinButton = this.querySelector('#signin-button');
        this.$email = this.querySelector('#email');
        this.$password = this.querySelector('#password');
        this.$form = this.querySelector('form');
        this.$errorMessages = this.querySelector('.error-messages');
        this.$signinButton.addEventListener('click', this.doAuthentication)
    }

    doAuthentication(e) {
        if (this.$form.checkValidity()) {
            e.preventDefault();
            const email = this.$email.value;
            const password = this.$password.value;
            Authentication.instance.doAuthentication(email, password)
                .then(success => {
                    RouterHandler.getInstance.router.navigate('/');
                })
                .catch(errors => {
                    for (var prop in errors) {
                        if(!errors.hasOwnProperty(prop)) continue;
                        while(this.$errorMessages.firstChild) {
                            this.$errorMessages.removeChild(this.$errorMessages.firstChild);
                        }
                        errors[prop].forEach(m => {
                            let text = prop + " " + m;
                            let errorItem = document.createElement('li');
                            errorItem.textContent = text;
                            this.$errorMessages.appendChild(errorItem);
                        });
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
                    <h1 class="text-xs-center">Sign in</h1>
                    <p class="text-xs-center">
                      <a href="#/register">Need an account?</a>
                    </p>
            
                    <ul class="error-messages">
                      <!--<li>That email is already taken</li>-->
                    </ul>
            
                    <form>
                      <fieldset class="form-group">
                        <input id="email" class="form-control form-control-lg" type="email" required placeholder="Email">
                      </fieldset>
                      <fieldset class="form-group">
                        <input id="password" class="form-control form-control-lg" type="password" placeholder="Password">
                      </fieldset>
                      <button id="signin-button" class="btn btn-lg btn-primary pull-xs-right">
                        Sign in
                      </button>
                    </form>
                  </div>
            
                </div>
              </div>
            </div>
`;
    }


}

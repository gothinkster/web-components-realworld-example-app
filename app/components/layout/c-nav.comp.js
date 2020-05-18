"use strict";

import {RouterHandler} from "../../router/router-handler";
import {Authentication} from "../../auth/authentication";


export class CNavComponent extends HTMLElement {
    constructor() {
        super();
        this.navigate = this.navigate.bind(this);
        this.$links = null;
        this.$navUl = null;
        this.$signin = null;
        this.$signup = null;
    }


    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    disconnectedCallback() {
        this.$links.forEach(link => {
            link.removeEventListener('click', e => this.navigate(e, link));
        });
    }

    connectedCallback() {
        this.innerHTML = this.render();

        this.$navUl = this.querySelector('ul.nav');
        this.$signin = this.querySelector('#signin');
        this.$signup = this.querySelector('#signup');


        if (Authentication.instance.auth) {
            this.userAuthenticated(Authentication.instance.auth);
        }

        Authentication.instance.onAuthenticate((user) => {
            this.setCurrentActive();
            this.userAuthenticated(user);
        });

        this.$links = this.querySelectorAll('a.nav-link');
        this.$links.forEach(link => {
            link.addEventListener('click', e => this.navigate(e, link));
        });
        this.setCurrentActive();
    }

    userAuthenticated(user) {
        this.removeGuestLinks();
        this.createProfileLinks(user);
    }

    removeGuestLinks() {
        this.$signin.parentNode.removeChild(this.$signin);
        this.$signup.parentNode.removeChild(this.$signup);
    }

    createProfileLinks(user) {
        let newArticle = this.createNavItemLink('#/editor', '<i class="ion-compose"></i>&nbsp;New Post');
        this.$navUl.appendChild(newArticle);

        let settings = this.createNavItemLink('#/settings', '<i class="ion-gear-a"></i>&nbsp;Settings');
        this.$navUl.appendChild(settings);

        let userProfile = this.createNavItemLink('#/profile/' + user.username, user.username);
        this.$navUl.appendChild(userProfile);
    }

    navigate(e, link) {
        e.preventDefault();
        var routingTo = link.getAttribute('href');
        RouterHandler.getInstance.router.navigate(routingTo);
        this.updateActive(routingTo);
    }

    setCurrentActive() {
        let curUrl = location.hash;
        this.updateActive(curUrl);
    }

    updateActive(route) {
        let links = this.querySelectorAll('a.nav-link');
        links.forEach(link => {
            link.className = 'nav-link';
            let linkRoute = link.getAttribute('href');
            if (linkRoute === route) {
                link.className = 'nav-link active';
            }
        });
    }

    createNavItemLink(href, content) {
        const liNavItem = document.createElement('li');
        liNavItem.className = 'nav-item';

        const aNavLink = document.createElement('a');
        aNavLink.classList.add('nav-link');
        aNavLink.href = href;
        aNavLink.innerHTML = content;

        liNavItem.appendChild(aNavLink);
        return liNavItem;
    }

    render() {
        return `
         <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="#/" data-navigo >conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <a href="#/" data-navigo class="nav-link">Home</a>
                    </li>
                    <li id="signin" class="nav-item">
                        <a href="#/login" data-navigo class="nav-link">Sign in</a>
                    </li>
                    <li id="signup" class="nav-item">
                        <a href="#/register" data-navigo class="nav-link">Sign up</a>
                    </li>
                </ul>
            </div>
        </nav>
`;
    }


}


"use strict";

import {RouterHandler} from "../../router/router-handler";


export class CNavComponent extends HTMLElement {
    constructor() {
        super();

    }


    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        var template = `
           <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="/" data-navigo >conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <a href="/" data-navigo class="nav-link">Home</a>
                    </li>
                    <!--<li class="nav-item">-->
                        <!--<a class="nav-link" href="">-->
                            <!--<i class="ion-compose"></i>&nbsp;New Post-->
                        <!--</a>-->
                    <!--</li>-->
                    <!--<li class="nav-item">-->
                        <!--<a class="nav-link" href="">-->
                            <!--<i class="ion-gear-a"></i>&nbsp;Settings-->
                        <!--</a>-->
                    <!--</li>-->
                    <li class="nav-item">
                        <a href="/login" data-navigo class="nav-link">Sign in</a>
                    </li>
                    <li class="nav-item">
                        <a href="/register" data-navigo class="nav-link">Sign up</a>
                    </li>
                </ul>
            </div>
        </nav>
        `;

        this.innerHTML = template;

        let links = this.querySelectorAll('a.nav-link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                var routingTo = link.getAttribute('href');
                RouterHandler.getInstance.router.navigate(routingTo);
                this.updateActive(routingTo);
            });
        });

        let curUrl = location.hash;
        curUrl = curUrl.substring(1);
        console.log(curUrl);
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


}


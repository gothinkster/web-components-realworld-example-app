"use strict";

import {RouterHandler} from '../../router/router-handler';

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
                <a class="navbar-brand" href="index.html">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <a style="cursor: pointer;" route="/" class="nav-link active">Home</a>
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
                        <a style="cursor: pointer;" route="/login" class="nav-link">Sign in</a>
                    </li>
                    <li class="nav-item">
                        <a style="cursor: pointer;" route="/register" class="nav-link">Sign up</a>
                    </li>
                </ul>
            </div>
        </nav>
        `;


        this.innerHTML = template;
        let links = this.querySelectorAll('a.nav-link');
        links.forEach(link => {
           link.addEventListener('click', () => {
               var routingTo = link.getAttribute('route');
               let state = {};
               state.route = routingTo;
               history.pushState(state, null, routingTo);
           });
        });

        this.updateActive(location.pathname);

        RouterHandler.onChange((routeTo) => {
            this.updateActive(routeTo);
        });

    }

    updateActive(route) {
        let links = this.querySelectorAll('a.nav-link');
        links.forEach(link => {
            link.className = 'nav-link';
            let linkRoute = link.getAttribute('route');
            if (linkRoute === route) {
                link.className = 'nav-link active';
            }
        });
    }


}

